import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const FlatmateBar = ({ monthlySales }) => {
  const [chartType, setChartType] = useState("line"); // Toggle between 'line' and 'pie'

  const options = {
    chart: {
      type: chartType,
      height: 350,
      width: "100%",
      animations: {
        enabled: true,
        dynamicAnimation: {
          speed: 1000,
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 5,
    },
    dataLabels: {
      enabled: chartType === "pie", // Enable labels only for pie chart
    },
    labels:
      chartType === "pie"
        ? [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ]
        : [],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  };

  const series =
    chartType === "pie"
      ? monthlySales || Array(12).fill(0)
      : [{ name: "Registrations", data: monthlySales || Array(12).fill(0) }];

  return (
    <div id="chart">
      {/* Toggle Button */}
      <button
        onClick={() => setChartType(chartType === "line" ? "pie" : "line")}
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md mt-2"
      >
        Switch to {chartType === "line" ? "Pie Chart" : "Line Chart"}
      </button>

      {/* Chart */}
      <ReactApexChart
        options={options}
        series={series}
        type={chartType}
        height={400}
        width={"100%"}
      />
    </div>
  );
};

export default FlatmateBar;
