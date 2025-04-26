// app/types/index.ts
export interface VehicleEntry {
  id: string;
  vehicleType: string;
  brand: string;
  model: string;
  plateNumber: string;
  driverName: string;
  contactNumber: string;
  purpose: string;
  entryTime: Date;
  exitTime?: Date | null;
}
export type TimeFilter = 'daily' | 'weekly' | 'monthly' | 'all';