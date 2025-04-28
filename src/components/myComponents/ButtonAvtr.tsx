import * as React from "react";
import { motion } from "framer-motion";

interface BtnProps {
  type?: "button" | "submit" | "reset";
  text: string;
  bgColor?: string;
  textColor?: string;
  height?: string;
  width?: string;
  borderRadius?: string;
  fontSize?: string;
  hover?: string;
}

export const ButtonAvtr = React.forwardRef<HTMLButtonElement, BtnProps>(
  (
    {
      type = "button",
      text,
      fontSize = "text-xl",
      bgColor = "bg-blue",
      textColor = "text-tertiary-purple",
      height = "h-12",
      width = "w-75",
      borderRadius = "rounded-sm",
      hover = "hover:bg-yellow",
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        type={type}
        className={`${hover} ${fontSize} ${bgColor} ${textColor} ${height} ${width} ${borderRadius} font-bold cursor-pointer transition-all duration-700`}
        {...props}
      >
        {text}
      </motion.button>
    );
  }
);

ButtonAvtr.displayName = "ButtonAvtr";