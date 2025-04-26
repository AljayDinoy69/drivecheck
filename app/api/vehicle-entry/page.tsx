// app/vehicle-entry/page.tsx
"use client"

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/subcom/button";
import { Input } from "@/components/subcom/input";
import { Label } from "@/components/subcom/label";
import { toast } from "@/hooks/use-toast";

export default function AddVehicleEntryPage() {
  const [entryData, setEntryData] = useState({
    vehicleType: "",
    brand: "",
    model: "",
    plateNumber: "",
    driverName: "",
    contactNumber: "",
    purpose: "",
  });

  const { addEntry } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addEntry(entryData);
      toast({
        title: "Success",
        description: "Vehicle entry added successfully.",
      });
      setEntryData({
        vehicleType: "",
        brand: "",
        model: "",
        plateNumber: "",
        driverName: "",
        contactNumber: "",
        purpose: "",
      });
    } catch (error: any) {
      console.error('Error adding vehicle entry:', error.message);
      toast({
        title: "Error",
        description: error.message || "Failed to add vehicle entry. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add Vehicle Entry</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="vehicleType">Vehicle Type</Label>
          <Input
            id="vehicleType"
            value={entryData.vehicleType}
            onChange={(e) =>
              setEntryData({ ...entryData, vehicleType: e.target.value })
            }
            placeholder="Enter vehicle type (e.g., Car, Truck)"
          />
        </div>
        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            value={entryData.brand}
            onChange={(e) =>
              setEntryData({ ...entryData, brand: e.target.value })
            }
            placeholder="Enter brand (e.g., Toyota)"
          />
        </div>
        <div>
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            value={entryData.model}
            onChange={(e) =>
              setEntryData({ ...entryData, model: e.target.value })
            }
            placeholder="Enter model (e.g., Camry)"
          />
        </div>
        <div>
          <Label htmlFor="plateNumber">Plate Number</Label>
          <Input
            id="plateNumber"
            value={entryData.plateNumber}
            onChange={(e) =>
              setEntryData({ ...entryData, plateNumber: e.target.value })
            }
            placeholder="Enter plate number (e.g., ABC123)"
          />
        </div>
        <div>
          <Label htmlFor="driverName">Driver Name</Label>
          <Input
            id="driverName"
            value={entryData.driverName}
            onChange={(e) =>
              setEntryData({ ...entryData, driverName: e.target.value })
            }
            placeholder="Enter driver name"
          />
        </div>
        <div>
          <Label htmlFor="contactNumber">Contact Number</Label>
          <Input
            id="contactNumber"
            value={entryData.contactNumber}
            onChange={(e) =>
              setEntryData({ ...entryData, contactNumber: e.target.value })
            }
            placeholder="Enter contact number (e.g., 1234567890)"
          />
        </div>
        <div>
          <Label htmlFor="purpose">Purpose</Label>
          <Input
            id="purpose"
            value={entryData.purpose}
            onChange={(e) =>
              setEntryData({ ...entryData, purpose: e.target.value })
            }
            placeholder="Enter purpose (e.g., Delivery)"
          />
        </div>
        <Button type="submit">Add Entry</Button>
      </form>
    </div>
  );
}