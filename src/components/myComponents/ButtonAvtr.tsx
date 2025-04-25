import * as React from "react";

interface BtnProps {
  type?: "button" | "submit" | "reset";
  text: string;
  bgColor?: string | 'blue';
  textColor?: string | 'tertiary-purple';
  height?: string;
  width?: string;
}

export function ButtonAvtr({ type = "button", text, bgColor, textColor, height, width }: BtnProps) {
  return <button type={type} className={`bg-${bgColor} cursor-pointer`}>{text}</button>;
}
