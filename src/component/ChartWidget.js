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
import { Expand } from "lucide-react";

const WidgetChart = ({ id, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState("dark");

  const [size, setSize] = useState(() => {
    const savedSize = localStorage.getItem(`widgetChartSize-${id}`);
    return savedSize || "medium";
  });

  const [data, setData] = useState(() => {
    // Retrieve saved chart data from localStorage
    const savedData = localStorage.getItem(`widgetChart-${id}`);
    return savedData
      ? JSON.parse(savedData)
      : [
          { name: "Jan", value: 400 },
          { name: "Feb", value: 300 },
          { name: "Mar", value: 600 },
          { name: "Apr", value: 800 },
          { name: "May", value: 500 },
        ];
  });

  const sizeClasses = {
    small: "w-64",
    medium: "w-80",
    large: "w-150",
  };

  const chartHeightClasses = {
    small: "h-32",
    medium: "h-48",
    large: "h-64",
  };

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(`widgetChart-${id}`, JSON.stringify(data));
    localStorage.setItem(`widgetChartSize-${id}`, size);
  }, [data, size, id]);

  // Dark mode observer
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }, []);

  const axisStyle = {
    fill: darkMode ? "#E5E7EB" : "#374151",
  };

  const handleDataEdit = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const addDataPoint = () => {
    setData([...data, { name: `Month ${data.length + 1}`, value: 0 }]);
  };

  const removeDataPoint = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const toggleSize = () => {
    const sizes = ["small", "medium", "large"];
    const currentIndex = sizes.indexOf(size);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setSize(sizes[nextIndex]);
  };

  return (
    <div
      className={`p-4 rounded-lg bg-white text-gray-800 shadow-lg dark:bg-gray-700 dark:text-white ${sizeClasses[size]}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Chart Widget</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSize}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
            title="Change Size"
          >
            <Expand className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-full hover:bg-blue-100 text-blue-500"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
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
      </div>

      {isEditing ? (
        <div className="space-y-2">
          {data.map((point, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={point.name}
                onChange={(e) => handleDataEdit(index, "name", e.target.value)}
                placeholder="Month"
                className="flex-1 p-1 border rounded dark:bg-gray-600"
              />
              <input
                type="number"
                value={point.value}
                onChange={(e) =>
                  handleDataEdit(index, "value", Number(e.target.value))
                }
                placeholder="Value"
                className="w-20 p-1 border rounded dark:bg-gray-600"
              />
              <button
                onClick={() => removeDataPoint(index)}
                className="text-red-500 hover:bg-red-100 p-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addDataPoint}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Data Point
          </button>
        </div>
      ) : (
        <div className={chartHeightClasses[size]}>
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
      )}
    </div>
  );
};

export default WidgetChart;
