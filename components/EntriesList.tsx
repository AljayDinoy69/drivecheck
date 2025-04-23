"use client";

import { useState } from "react";
import { Button } from "@/components/subcom/button";
import { Input } from "@/components/subcom/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/subcom/table";
import { VehicleEntry } from "@/app/types";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export default function EntriesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const entries = useStore((state) => state.entries);
  const updateExitTime = useStore((state) => state.updateExitTime);

  const handleExitVehicle = (id: string) => {
    updateExitTime(id);
    toast.success("Exit time recorded successfully");
  };

  const filteredEntries = entries.filter((entry) =>
    Object.values(entry).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search entries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Entry Time</TableHead>
              <TableHead>Vehicle Info</TableHead>
              <TableHead>Driver Info</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.entryTime.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="font-medium">{entry.plateNumber}</div>
                  <div className="text-sm text-muted-foreground">
                    {entry.brand} {entry.model} ({entry.vehicleType})
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{entry.driverName}</div>
                  <div className="text-sm text-muted-foreground">{entry.contactNumber}</div>
                </TableCell>
                <TableCell>{entry.purpose}</TableCell>
                <TableCell>
                  {entry.exitTime ? (
                    <span className="text-green-600">Exited</span>
                  ) : (
                    <span className="text-blue-600">Inside</span>
                  )}
                </TableCell>
                <TableCell>
                  {!entry.exitTime && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExitVehicle(entry.id)}
                    >
                      Record Exit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}