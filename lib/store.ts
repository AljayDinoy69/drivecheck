'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // <-- import persist!
import { VehicleEntry } from '@/app/types';

interface StoreState {
  entries: VehicleEntry[];
  addEntry: (entry: Omit<VehicleEntry, 'id' | 'entryTime'>) => void;
  updateExitTime: (id: string) => void;
  getEntries: () => VehicleEntry[];
}



export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
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
      getEntries: () => get().entries,
    }),
    {
      name: 'vehicle-entries-storage', // 👈 key name in localStorage
      partialize: (state) => ({ entries: state.entries }), // only save entries (not functions)
    }
  )
);
