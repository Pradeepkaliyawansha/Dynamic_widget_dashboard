import React, { useState, useEffect } from "react";
import { Expand } from "lucide-react";

const WidgetText = ({ id, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [size, setSize] = useState(() => {
    const savedSize = localStorage.getItem(`widgetTextSize-${id}`);
    return savedSize || "medium";
  });

  const [text, setText] = useState(() => {
    // Retrieve saved text from localStorage using widget-specific key
    const savedText = localStorage.getItem(`widgetText-${id}`);
    return savedText || "Click to edit this text widget";
  });

  const sizeClasses = {
    small: "w-64",
    medium: "w-80",
    large: "w-150",
  };

  // Save text and size to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`widgetText-${id}`, text);
    localStorage.setItem(`widgetTextSize-${id}`, size);
  }, [text, size, id]);

  const toggleSize = () => {
    const sizes = ["small", "medium", "large"];
    const currentIndex = sizes.indexOf(size);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setSize(sizes[nextIndex]);
  };

  return (
    <div
      className={`h-full p-4 rounded-lg dark:bg-gray-700 dark:text-white bg-white text-gray-800
     shadow-lg transition-all duration-300 ${sizeClasses[size]}`}
    >
      <div className="widget-header flex justify-between items-center mb-2 ">
        <h3 className="text-lg font-semibold">Text Widget</h3>
        <div className="flex gap-2 items-center">
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

      {/* Content Area */}
      <div className="h-[calc(100%-3rem)]">
        {isEditing ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`w-full h-full p-2 rounded border dark:bg-gray-600 dark:border-gray-500 
              bg-gray-50 border-gray-300 resize-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent`}
          />
        ) : (
          <div className="h-full overflow-auto p-2">{text}</div>
        )}
      </div>
    </div>
  );
};

export default WidgetText;
