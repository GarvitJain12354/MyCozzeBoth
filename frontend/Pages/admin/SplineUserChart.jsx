import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const YearlyUsersChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    months: [],
    flatmates: [],
    pgOwners: [],
    flatOwners: [],
  });

  useEffect(() => {
    setChartData(data);
  }, [data]);

  const options = {
    chart: { type: "line", zoom: { enabled: false } },
    xaxis: { categories: chartData.months },
    stroke: { curve: "smooth" },
    // title: { text: "Yearly User Registrations", align: "left" },
  };

  const series = [
    { name: "Tenant", data: chartData.flatmates },
    { name: "PG Owners", data: chartData.pgOwners },
    { name: "Flat Owners", data: chartData.flatOwners },
  ];

  return (
    <div className="w-[100%]">
       <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default YearlyUsersChart;
