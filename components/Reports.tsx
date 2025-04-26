"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/subcom/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/subcom/select";
import { TimeFilter } from "@/app/types";
import { useStore } from "@/lib/store";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Reports() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("timeFilter") as TimeFilter) || "daily";
    }
    return "daily";
  });

  const entries = useStore((state) => state.entries);

  // Ensure dates are actual Date objects
  const parsedEntries = entries.map(entry => ({
    ...entry,
    entryTime: new Date(entry.entryTime),
    exitTime: entry.exitTime ? new Date(entry.exitTime) : null,
  }));

  const filterEntries = () => {
    const now = new Date();
    const startDate = new Date();

    switch (timeFilter) {
      case 'daily':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'weekly':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'monthly':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'all':
        return parsedEntries;
    }

    return parsedEntries.filter(entry => entry.entryTime >= startDate);
  };

  const filteredEntries = filterEntries();

  const stats = {
    totalEntries: filteredEntries.length,
    currentlyInside: filteredEntries.filter(entry => !entry.exitTime).length,
    averageStayDuration: (() => {
      const completedVisits = filteredEntries.filter(entry => entry.exitTime);
      if (completedVisits.length === 0) return 0;
      
      const totalDuration = completedVisits.reduce((acc, entry) => {
        return acc + (entry.exitTime!.getTime() - entry.entryTime.getTime());
      }, 0);
      
      return Math.round(totalDuration / completedVisits.length / (1000 * 60 * 60));
    })()
  };

  const chartData = (() => {
    const vehicleTypes = filteredEntries.reduce((acc, entry) => {
      acc[entry.vehicleType] = (acc[entry.vehicleType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(vehicleTypes).map(([type, count]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      count,
    }));
  })();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <Select
          value={timeFilter}
          onValueChange={(value: TimeFilter) => {
            setTimeFilter(value);
            localStorage.setItem("timeFilter", value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalEntries}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Currently Inside</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.currentlyInside}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Stay Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.averageStayDuration}h</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vehicle Types Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
