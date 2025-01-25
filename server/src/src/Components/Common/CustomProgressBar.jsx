import { Progress } from "antd";
import React from "react";

const CustomProgressBar = ({
  percent,
  type,
  className,
  percentPosition,
  size,
  strokeLinecap,
  totalField,
  strokeWidth,
  status,
  defaultColor = false,
}) => {
  const colors = !defaultColor && {
    "0%": "#c0a6f2", // light violet
    "10%": "#b58ee5",
    "20%": "#a574d9",
    "30%": "#995bcf",
    "40%": "#8d4bc7",
    "50%": "#7f4bbf", // transition point
    "60%": "#6db885", // light green
    "70%": "#64b76e",
    "80%": "#5abf61",
    "90%": "#50b656",
    "100%": "#a4d68c", // light green
  };
  return (
    <Progress
      percent={percent}
      strokeColor={percent !== 100 && colors}
      status={status}
      type={type}
      percentPosition={percentPosition}
      strokeLinecap={strokeLinecap}
      size={size}
      className={`${className}`}
      strokeWidth={strokeWidth}
    />
  );
};

export default CustomProgressBar;
