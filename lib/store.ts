import { create } from 'zustand';
import { VehicleEntry } from '@/app/types';
import { prisma } from './prisma';

interface StoreState {
  entries: VehicleEntry[];
  addEntry: (entry: Omit<VehicleEntry, 'id' | 'entryTime'>) => Promise<void>;
  updateExitTime: (id: string) => Promise<void>;
  getEntries: () => Promise<VehicleEntry[]>;
}

export const useStore = create<StoreState>((set, get) => ({
  entries: [],
  addEntry: async (entry) => {
    const response = await fetch('/api/vehicle-entry/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add vehicle entry');
    }

    const newEntry = await response.json();
    set((state) => ({
      entries: [newEntry as VehicleEntry, ...state.entries],
    }));
  },
  updateExitTime: async (id) => {
    await prisma.vehicleEntry.update({
      where: { id },
      data: { exitTime: new Date() },
    });
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.id === id ? { ...entry, exitTime: new Date() } : entry
      ),
    }));
  },
  getEntries: async () => {
    const entries = await prisma.vehicleEntry.findMany({
      orderBy: { entryTime: 'desc' },
    });
    set({ entries: entries as VehicleEntry[] });
    return entries as VehicleEntry[];
  },
}));