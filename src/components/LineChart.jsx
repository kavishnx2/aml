import React from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import { ResponsiveContainer } from "recharts";

const LineChart = ({ data }) => {
  const options = {

    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 20,
            stepSize: 3,
          },
        },
      ],
    }
  };


  return (
    <ResponsiveContainer width="100%" height={230}>
      <Line data={data} options={options} />
    </ResponsiveContainer>
  );
};

export default LineChart;
