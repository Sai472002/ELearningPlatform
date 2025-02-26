import React from "react";
import { Chart } from "primereact/chart";

const CustomDonut = ({
  type = "doughnut",
  labels,
  courseData,
  legendDisplay = false,
  className,
}) => {
  const pieData = courseData?.map((v) => v.count);
  const pieLabel = courseData?.map((v) => v.name);
  const pieColor = courseData?.map((v) => v.color);

  const chartData = {
    labels: pieLabel,
    datasets: [
      {
        data: pieData,
        backgroundColor: pieColor || [
          "#ede9fe",
          "#4338ca",
          "#6d28d9",
          "#e11d48",
          "#ca8a04",
          "#16a34a",
        ],
        hoverBackgroundColor: [
          "#ede9fe",
          "#4f46e5",
          "#7c3aed",
          "#f43f5e",
          "#eab308",
          "#10b981",
        ],
      },
    ],
  };
  const options = {
    cutout: "60%",
    plugins: {
      legend: {
        display: legendDisplay,
      },
    },
  };
  return (
    <div className="relative">
      <p className="absolute top-[45%] left-[40%] font-medium">
        Total : <span className="text-Primary">{courseData?.length}</span>
      </p>
      <Chart
        type={type}
        data={chartData}
        options={options}
        className={className}
      />
    </div>
  );
};

export default CustomDonut;
