"use client";

import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const LineChart = ({ cardName, cardValue, cardAction, chartData }) => {
  return (
    <Card className="p-2 flex-fill">
      <CardContent>
        <Typography
          sx={{ fontSize: 20 }}
          color="text.secondary"
          gutterBottom
          align="center"
          fontWeight="bolder"
          marginBottom={3}
        >
          {cardName}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          align="center"
          marginBottom={2}
        >
          {cardValue}
        </Typography>
      </CardContent>

      {chartData ? <Line data={chartData} /> : null}

      <br />
      <br />
    </Card>
  );
};

export default LineChart;
