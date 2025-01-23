import React, { useState, useEffect } from "react";

const WidgetText = ({ id, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(() => {
    // Retrieve saved text from localStorage using widget-specific key
    const savedText = localStorage.getItem(`widgetText-${id}`);
    return savedText || "Click to edit this text widget";
  });

  // Save text to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`widgetText-${id}`, text);
  }, [text, id]);

  return (
    <div
      className="h-full p-4 rounded-lg dark:bg-gray-700 dark:text-white bg-white text-gray-800
     shadow-lg transition-all duration-300"
    >
      <div className="widget-header flex justify-between items-center mb-2 ">
        <h3 className="text-lg font-semibold">Text Widget</h3>
        <div className="flex gap-2 items-center">
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
