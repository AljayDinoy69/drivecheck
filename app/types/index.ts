export interface VehicleEntry {
  id: string;
  entryTime: Date;
  exitTime?: Date;
  vehicleType: string;
  brand: string;
  model: string;
  plateNumber: string;
  driverName: string;
  contactNumber: string;
  purpose: string;
}

export type TimeFilter = 'daily' | 'weekly' | 'monthly' | 'all';