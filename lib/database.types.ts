export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      vehicle_entries: {
        Row: {
          id: string
          entry_time: string
          exit_time: string | null
          vehicle_type: string
          brand: string
          model: string
          plate_number: string
          driver_name: string
          contact_number: string
          purpose: string
          created_at: string
        }
        Insert: {
          id?: string
          entry_time?: string
          exit_time?: string | null
          vehicle_type: string
          brand: string
          model: string
          plate_number: string
          driver_name: string
          contact_number: string
          purpose: string
          created_at?: string
        }
        Update: {
          exit_time?: string | null
        }
      }
    }
  }
}