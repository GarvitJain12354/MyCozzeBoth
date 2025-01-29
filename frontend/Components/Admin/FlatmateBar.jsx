import ReactApexChart from "react-apexcharts";

const FlatmateBar = ({ monthlySales }) => {
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
        borderRadius: 5,
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
    },
  };

  const series = [
    {
      name: "Registrations",
      data: monthlySales || Array(12).fill(0), // Default to 0 if no data
    },
  ];

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={400} />
    </div>
  );
};

export default FlatmateBar;
