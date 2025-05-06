"use client";

import React from "react";
import { BsArrowUpShort } from "react-icons/bs";
import { BsArrowDownShort } from "react-icons/bs";
import { IoIosShareAlt } from "react-icons/io";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { GiCash } from "react-icons/gi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useDashboardData } from "@/hooks/useDashboardData";

interface CardContent {
  label: string;
  value: number;
  growth: number;
  icon: React.ComponentType;
  isCash: boolean;
}

const {
  indicationsOfMonth,
  totalLeadsConverted,
  totalCommissionGenerated,
  leadsAwaitingContact,
  withdrawalsMade,
} = useDashboardData();

// Values
const _indicationsOfMonth = indicationsOfMonth.value;
const indicationsMonthGrowth = 100;

const _totalLeadsConverted = totalLeadsConverted.value;
const convertedIndicationsGrowth = -3.1;

const _totalCommissionGenerated = totalCommissionGenerated.value;
const commissionGeneratedGrowth = 0.32;

const _leadsAwaitingContact = leadsAwaitingContact.value;
const leadsAwaitingContactGrowth = 0;

const _withdrawalsMade = withdrawalsMade.value;
const withdrawalsMadeGrowth = 100;

export const cardsContent: CardContent[] = [
  {
    label: "Indicações do mês",
    value: _indicationsOfMonth,
    growth: indicationsMonthGrowth,
    icon: IoIosShareAlt,
    isCash: true,
  },
  {
    label: "Total de leads convertidos",
    value: _totalLeadsConverted,
    growth: convertedIndicationsGrowth,
    icon: BiMoneyWithdraw,
    isCash: false,
  },
  {
    label: "Total comissão gerada",
    value: _totalCommissionGenerated,
    growth: commissionGeneratedGrowth,
    icon: RiMoneyDollarCircleFill,
    isCash: true,
  },
  {
    label: "Leads Aguardando contato",
    value: _leadsAwaitingContact,
    growth: leadsAwaitingContactGrowth,
    icon: GiCash,
    isCash: true,
  },
  {
    label: "Saques realizados",
    value: _withdrawalsMade,
    growth: withdrawalsMadeGrowth,
    icon: BsFillCheckCircleFill,
    isCash: false,
  },
];

export function Card() {
  return (
    <>
      {cardsContent.map((card) => (
        <div className="bg-[#F6F8FA] h-25 w-full rounded-2xl flex justify-center items-center">
          <div className="flex flex-row gap-4 justify-center items-center">
            <div className="h-15 w-15 rounded-2xl bg-gradient-to-br from-fifth-purple to-[#4A04A5] flex justify-center items-center">
              Icone aqui
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row gap-2 items-end">
                <span className="text-2xl font-bold text-[#1F384C]">
                  card.value
                </span>
                <div className="flex flex-row items-center">
                  {card.growth > 0 ? (
                    <BsArrowUpShort className="text-green" size={20} />
                  ) : card.growth >= 0 ? (
                    ""
                  ) : (
                    <BsArrowDownShort className="text-red" size={20} />
                  )}
                  <span
                    className={
                      card.growth > 0
                        ? "text-green"
                        : card.growth >= 0
                        ? "text-[#1F384C]"
                        : "text-red"
                    }
                  >
                    {card.growth}%
                  </span>
                </div>
              </div>
              <div className="text-[#80809C]">card.label</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
