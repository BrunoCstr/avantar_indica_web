import React from "react";

interface SpinnerProps {
  size?: number;
  thickness?: number;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 28,
  thickness = 4,
}) => {
  return (
    <div
      className="animate-spin rounded-full border-t-primary-purple"
      style={{
        width: size,
        height: size,
        borderWidth: thickness,
        borderStyle: "solid",
        borderLeftColor: "#C252F2",
        borderRightColor: "#C252F2",
        borderBottomColor: "#C252F2",
      }}
    ></div>
  );
};
