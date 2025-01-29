"use client";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const options = {
  chart: {
    type: "bar",
    height: 350,
    width: "100%",
    animations: {
      enabled: true,
      dynamicAnimation: {
        speed: 1000,
      },
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "80%",
      borderRadiusApplication: "end",
      borderRadius: 5,
      dataLabels: {
        position: "top",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
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
    labels: {
      show: true,
    },
  },
};

const MonthBar = ({ monthlySales }) => {
  const [bar, setBar] = useState([]);

  useEffect(() => {
    if (monthlySales && Array.isArray(monthlySales)) {
      // Filter out invalid data where month or year is null
      const validSales = monthlySales.filter(
        (data) => data.month !== null && data.year !== null
      );

      // Ensure the month is within the valid range (0-11), then map over to extract the count
      setBar(
        validSales.map((data) => ({
          month: data.month,
          count: data.count,
        }))
      );
    }
  }, [monthlySales]);

  // Prepare data for chart
  const series = [
    {
      name: "Listings",
      data: Array(12).fill(0).map((_, index) => {
        // Get count for each month, defaulting to 0 if no data for that month
        const monthData = bar.find((data) => data.month === index);
        return monthData ? monthData.count : 0;
      }),
    },
  ];

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={400} width={"100%"} />
    </div>
  );
};

export default MonthBar;
