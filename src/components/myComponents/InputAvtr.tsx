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
  errorMessage?: string | undefined;
}

export const InputAvtr = React.forwardRef<HTMLInputElement, inputProps>(
  (
    {
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
      borderColor = "#29F3DF",
      errorMessage,
      ...props
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`${borderWidth} ${placeholderColor} ${fontSize} ${bgColor} ${textColor} ${height} ${width} ${borderRadius} font-regular outline-0 p-3`}
        style={{ borderColor: errorMessage ? "red" : borderColor }}
        {...props}
      />
    );
  }
);

InputAvtr.displayName = "InputAvtr";
