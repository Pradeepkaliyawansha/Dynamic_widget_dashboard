import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";

const WidgetImage = ({ id, onRemove }) => {
  const [imageUrl, setImageUrl] = useState(() => {
    // Try to retrieve image from sessionStorage on initial render
    const savedImage = sessionStorage.getItem(`widgetImage-${id}`);
    return savedImage || "/api/placeholder/400/320";
  });
  const [isDragging, setIsDragging] = useState(false);

  // Effect to save image to sessionStorage whenever it changes
  useEffect(() => {
    if (imageUrl !== "/api/placeholder/400/320") {
      sessionStorage.setItem(`widgetImage-${id}`, imageUrl);
    }
  }, [imageUrl, id]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    // Remove image from sessionStorage when removed
    sessionStorage.removeItem(`widgetImage-${id}`);
    setImageUrl("/api/placeholder/400/320");

    // Call the original onRemove prop if provided
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div className="p-4 rounded-lg dark:bg-gray-700 dark:text-white bg-white text-gray-800 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Image Widget</h3>
        <button
          onClick={handleRemoveImage}
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

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative h-40 bg-gray-200 dark:bg-gray-800 rounded overflow-hidden 
          ${isDragging ? "border-2 border-dashed border-blue-500" : ""}`}
      >
        <img
          src={imageUrl}
          alt="Widget content"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
          <Upload className="w-8 h-8 text-white mb-2" />
          <label className="cursor-pointer px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100">
            Change Image
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default WidgetImage;
