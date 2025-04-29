"use client";

import React from "react";
import { IoIosShareAlt } from "react-icons/io";

import { useAuth } from "@/context/Auth";
import { Card } from "@/components/myComponents/dashboard/Card";

export default function Dashboard() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <p>Carregando... Colocar skeleton</p>;
  }

  return (
    <div className="w-full h-full py-2 pr-2">
      <div className="rounded-[35px] h-full pt-12 pl-10 pr-8">
        <p className="text-2xl">Dashboard</p>
        <div className="h-[90%] mt-8 bg-blue">
            <div className="w-full flex flex-row gap-3">
                <Card 
                value="2.022"
                label="Total Indicações do mês"
                growth="2.1"
                icon={<IoIosShareAlt color="white"/>}
                />
                <Card 
                value="2.022"
                label="Total Indicações do mês"
                growth="2.1"
                icon={<IoIosShareAlt />}
                />
                <Card 
                value="2.022"
                label="Total Indicações do mês"
                growth="-1.2"
                icon={<IoIosShareAlt />}
                />
                <Card 
                value="2.022"
                label="Total Indicações do mês"
                growth="0"
                icon={<IoIosShareAlt />}
                />
                <Card 
                value="2.022"
                label="Total Indicações do mês"
                growth="-1.5"
                icon={<IoIosShareAlt />}
                />
            </div>
        </div>
      </div>
    </div>
  );
}
