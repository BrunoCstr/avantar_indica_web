import * as React from "react";

interface inputProps {
  type?: "password" | "email" | "number" | "search" | "tel" | "text";
  placeholder: string;
  bgColor?: string;
  textColor?: string;
  placeholderColor?: string;
  height?: string;
  width?: string;
  borderRadius?: string;
  fontSize?: string;
  borderWidth?: string;
  borderColor?: string;
}

export function InputAvtr({
  type = "text",
  fontSize = "text-sm",
  bgColor = "bg-tertiary-purple-opacity",
  textColor = "text-white",
  height = "h-12",
  width = "w-75",
  placeholder,
  placeholderColor = "placeholder-white-opacity",
  borderRadius = "rounded-sm",
  borderWidth = "border-[1px]",
  borderColor = "border-blue",
}: inputProps) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      className={`${borderWidth} ${borderColor} ${placeholderColor} ${fontSize} ${bgColor} ${textColor} ${height} ${width} ${borderRadius} font-regular outline-0 p-3`}
    ></input>
  );
}
