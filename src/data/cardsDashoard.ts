import { IoIosShareAlt } from "react-icons/io";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { GiCash } from "react-icons/gi";
import { BsFillCheckCircleFill } from "react-icons/bs";

interface CardContent {
    label: string;
    value: number;
    growth: number;
    icon: React.ComponentType; 
    isCash: boolean;
  }

// Values
const indicationsMonth = 30;
const indicationsMonthGrowth = 100;

const convertedIndications = 3;
const convertedIndicationsGrowth = -3.1;

const commissionGenerated = 500.00;
const commissionGeneratedGrowth = 0.32;

const AccumulatedCashback = 50.00;
const AccumulatedCashbackGrowth = 0;

const withdrawalsMade = 1;
const withdrawalsMadeGrowth = 100;

export const cardsContent: CardContent[] = [
  {
    label: "Total indicações do mês",
    value: indicationsMonth,
    growth: indicationsMonthGrowth,
    icon: IoIosShareAlt,
    isCash: true,
  },
  {
    label: "Indicações convertidas",
    value: convertedIndications,
    growth: convertedIndicationsGrowth,
    icon: BiMoneyWithdraw,
    isCash: false,
  },
  {
    label: "Total comissão gerada",
    value: commissionGenerated,
    growth: commissionGeneratedGrowth,
    icon: RiMoneyDollarCircleFill,
    isCash: true,
  },
  {
    label: "Cashback acumulado",
    value: AccumulatedCashback,
    growth: AccumulatedCashbackGrowth,
    icon: GiCash,
    isCash: true,
  },
  {
    label: "Saques realizados",
    value: withdrawalsMade,
    growth: withdrawalsMadeGrowth,
    icon: BsFillCheckCircleFill,
    isCash: false,
  },
];
