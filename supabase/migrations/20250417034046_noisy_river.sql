/*
  # Create vehicle entries table

  1. New Tables
    - `vehicle_entries`
      - `id` (uuid, primary key)
      - `entry_time` (timestamptz)
      - `exit_time` (timestamptz, nullable)
      - `vehicle_type` (text)
      - `brand` (text)
      - `model` (text)
      - `plate_number` (text)
      - `driver_name` (text)
      - `contact_number` (text)
      - `purpose` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `vehicle_entries` table
    - Add policies for authenticated users to:
      - Read all entries
      - Insert new entries
      - Update exit time for existing entries
*/

CREATE TABLE IF NOT EXISTS vehicle_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_time timestamptz NOT NULL DEFAULT now(),
  exit_time timestamptz,
  vehicle_type text NOT NULL,
  brand text NOT NULL,
  model text NOT NULL,
  plate_number text NOT NULL,
  driver_name text NOT NULL,
  contact_number text NOT NULL,
  purpose text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE vehicle_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read all entries"
  ON vehicle_entries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert entries"
  ON vehicle_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update exit time"
  ON vehicle_entries
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (
    -- Only allow updating exit_time column
    (OLD.exit_time IS NULL AND NEW.exit_time IS NOT NULL) AND
    (OLD.entry_time = NEW.entry_time) AND
    (OLD.vehicle_type = NEW.vehicle_type) AND
    (OLD.brand = NEW.brand) AND
    (OLD.model = NEW.model) AND
    (OLD.plate_number = NEW.plate_number) AND
    (OLD.driver_name = NEW.driver_name) AND
    (OLD.contact_number = NEW.contact_number) AND
    (OLD.purpose = NEW.purpose)
  );