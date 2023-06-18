import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Typography, useMediaQuery } from "@mui/material";

export default function EstimatePieChart({ history }) {
  const graphColors = [
    "#844389",
    "#CE5582",
    "#FD7E6D",
    "#FFB95D",
    "#F9F871",
    "#7F59A9",
    "#AD6ABC",
    "#DB7CCD",
    "#FF8FDB",
    "#D0A616",
    "#5666AE",
  ];

  const isAppWidthLessThan750px = useMediaQuery(
    (theme) => `(max-width: 750px)`
  );
  const setOuterRadius = isAppWidthLessThan750px ? 100 : 150;

  const RADIAN = Math.PI / 180;

  const historyData = history.reduce((acc, story) => {
    const estimate = story.estimate;
    if (acc[estimate]) {
      acc[estimate]++;
    } else {
      acc[estimate] = 1;
    }
    return acc;
  }, {});

  const data = Object.keys(historyData).map((key, index) => {
    return { name: key, value: historyData[key] };
  });

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
    const startAngle = midAngle - 90;
    const endAngle = midAngle + 90;
    const angle = (startAngle + endAngle) / 2;
    const x = cx + radius * Math.cos(-angle * RADIAN);
    const y = cy + radius * Math.sin(-angle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${data[index].name}`}
      </text>
    );
  };

  return (
    <div className="room-estimate-chart-container">
      <Typography className="chart-title">Estimate</Typography>
      <ResponsiveContainer width="99%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={setOuterRadius}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={graphColors[index % graphColors.length]}
              />
            ))}
          </Pie>
          <Legend
            iconSize={15}
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
