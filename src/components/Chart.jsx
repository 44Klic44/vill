import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Компонент Chart получает данные через props
// data = [{ name: 'high', total: 5 }, { name: 'medium', total: 3 }, ...]
export const Chart = ({ data }) => {
  if (!data || data.length === 0) return <p>No chart data available</p>;

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        width={150}
        height={40}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ textTransform: "capitalize" }} />
        <YAxis allowDecimals={false} />
        <Tooltip
          cursor={{ fill: "rgba(0,0,0,0.05)" }}
          contentStyle={{ textTransform: "capitalize" }}
        />
        <Bar dataKey="total" fill="#8884d8" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
};