import React from "react";

interface CardProps {
  icon: React.ReactNode;
  value: string;
  growth: string;
  label: string;
}

export const Card: React.FC<CardProps> = ({ icon, value, growth, label }) => {
  const growthInNumber = parseFloat(growth);

  return (
    <div className="bg-[#F6F8FA] h-25 w-full rounded-2xl flex justify-center items-center">
      <div className="flex flex-row gap-4 justify-center items-center">
        <div className="h-15 w-15 rounded-2xl bg-gradient-to-br from-primary-purple to-[#9F8CF2] flex justify-center items-center">
          {icon}
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-3 items-end">
            <span className="text-2xl font-bold text-[#1F384C]">{value}</span>
            <span className={growthInNumber > 0 ? 'text-green' : growthInNumber >= 0 ? 'text-[#1F384C]' : 'text-red' }>{growth}%</span>
          </div>
          <div className="text-[#80809C]">{label}</div>
        </div>
      </div>
    </div>
  );
};
