import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WidgetChart = ({ onRemove }) => {
  const [data] = useState([
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 500 },
  ]);
  const [darkMode, setDarkMode] = useState("dark");

  useEffect(() => {
    // Check if the dark mode class is applied to the root element
    const observer = new MutationObserver(() => {
      setDarkMode(document.documentElement.classList.contains("dark"));
    });

    // Observe the document's class changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }, []);

  const axisStyle = {
    fill: darkMode ? "#E5E7EB" : "#374151", // Light gray for dark mode, dark gray for light mode
  };

  return (
    //implement the ui of chart Widget
    <div className="p-4 rounded-lg bg-white text-gray-800 shadow-lg  dark:bg-gray-700 dark:text-white ">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Chart Widget</h3>
        <button
          onClick={onRemove}
          className="p-2 rounded-full hover:bg-red-100 text-red-500"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="h-48">
        {/* use rechart  */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={darkMode ? "#4B5563" : "#E5E7EB"}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: axisStyle.fill }}
              stroke={axisStyle.fill}
            />
            <YAxis tick={{ fill: axisStyle.fill }} stroke={axisStyle.fill} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WidgetChart;
