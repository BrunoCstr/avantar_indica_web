"use client";

import React from "react";

import { useAuth } from "@/context/Auth";
import { Card } from "@/components/myComponents/dashboard/Card";
import { cardsContent } from "@/data/cardsDashoard";
import { List } from "@/components/myComponents/dashboard/List";
import { listBiggestIndicators } from "@/data/listBiggestIndicators";
import { BarChartAvtr } from "@/components/myComponents/dashboard/BarChart";
import { DashboardSkeleton } from "@/components/skeletons/DashboardSkeleton";

export default function Dashboard() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <DashboardSkeleton/>
  }

  return (
    <div className="w-full h-full bg-fifth-purple">
      <div className="h-full pt-9 pl-8 pr-8">
        <p className="text-2xl text-[#fff]">Dashboard</p>
        <div className="h-[90%] mt-8 ">
          <div className="w-full flex flex-row gap-2">
            {cardsContent.map((card) => (
              <Card
                value={card.value}
                icon={card.icon}
                label={card.label}
                growth={card.growth}
                isCash={card.isCash}
              />
            ))}
          </div>

          <div className="mt-2">
            <List items={listBiggestIndicators}/>
          </div>

          <div className="mt-2 flex gap-4 justify-center">
            <BarChartAvtr/>
            <BarChartAvtr/>
          </div>
        </div>
      </div>
    </div>
  );
}
