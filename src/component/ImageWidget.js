import React from "react";

const WidgetImage = ({ onRemove }) => {
  return (
    <div className="p-4 rounded-lg dark:bg-gray-700 dark:text-white bg-white text-gray-800 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Image Widget</h3>
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
      <div className="relative h-40 bg-gray-200 dark:bg-gray-800 rounded overflow-hidden">
        <img
          src="/api/placeholder/400/320"
          alt="Placeholder"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default WidgetImage;
