import React from "react";
import { Skeleton } from "../ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="w-full h-full flex flex-col bg-fifth-purple">
      <div className="h-full pt-9 pl-8 pr-8">
        <p className="text-2xl text-[#fff]">Dashboard</p>
        <div className="h-[90%] flex flex-col flex-1 mt-8 min-h-0">
          {/* Skeleton dos cards */}
          <div className="w-full flex flex-row gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-1/4 rounded-xl" />
            ))}
          </div>

          {/* Skeleton da lista */}
          <div className="mt-6 space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-md" />
            ))}
          </div>

          {/* Skeleton dos gráficos */}
          <div className="mt-6 flex-1 flex gap-4 justify-center">
            <Skeleton className="w-1/2 rounded-xl h-full" />
            <Skeleton className="w-1/2 rounded-xl h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
