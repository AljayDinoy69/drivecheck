import { create } from 'zustand';
import { VehicleEntry } from '@/app/types';

interface StoreState {
  entries: VehicleEntry[];
  addEntry: (entry: Omit<VehicleEntry, 'id' | 'entryTime'>) => void;
  updateExitTime: (id: string) => void;
  getEntries: () => VehicleEntry[];
}

export const useStore = create<StoreState>((set, get) => ({
  entries: [],
  addEntry: (entry) => {
    const newEntry: VehicleEntry = {
      id: crypto.randomUUID(),
      entryTime: new Date(),
      ...entry
    };
    set((state) => ({
      entries: [newEntry, ...state.entries]
    }));
  },
  updateExitTime: (id) => {
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.id === id ? { ...entry, exitTime: new Date() } : entry
      )
    }));
  },
  getEntries: () => get().entries
}));