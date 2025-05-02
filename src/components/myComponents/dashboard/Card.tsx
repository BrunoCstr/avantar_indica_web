import React from "react";

import { BsArrowUpShort } from "react-icons/bs";
import { BsArrowDownShort } from "react-icons/bs";
import { BsChevronBarContract } from "react-icons/bs";

interface CardProps {
  icon: React.ElementType;
  value: number | string;
  growth: number;
  label: string;
  isCash?: boolean;
}

export const Card: React.FC<CardProps> = ({
  icon: Icon,
  value,
  growth,
  label,
  isCash = false,
}) => {
  const formattedValue = isCash
    ? value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : value.toString();

  return (
    <div className="bg-[#F6F8FA] h-25 w-full rounded-2xl flex justify-center items-center">
      <div className="flex flex-row gap-4 justify-center items-center">
        <div className="h-15 w-15 rounded-2xl bg-gradient-to-br from-fifth-purple to-[#4A04A5] flex justify-center items-center">
          <Icon className="text-white" size={30} />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-2 items-end">
            <span className="text-2xl font-bold text-[#1F384C]">
              {isCash ? `R$ ${formattedValue}` : formattedValue}
            </span>
            <div className="flex flex-row items-center">
              {growth > 0 ? (
                <BsArrowUpShort className="text-green" size={20} />
              ) : growth >= 0 ? (
                ""
              ) : (
                <BsArrowDownShort className="text-red" size={20} />
              )}
              <span
                className={
                  growth > 0
                    ? "text-green"
                    : growth >= 0
                    ? "text-[#1F384C]"
                    : "text-red"
                }
              >
                {growth}%
              </span>
            </div>
          </div>
          <div className="text-[#80809C]">{label}</div>
        </div>
      </div>
    </div>
  );
};
