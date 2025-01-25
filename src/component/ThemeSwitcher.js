import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  //Create toggle switch for change theme

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="absolute top-4 right-4 flex items-center">
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={darkMode}
            onChange={toggleTheme}
          />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div
            className={`
              dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 
              transition transform ${
                darkMode ? "translate-x-full bg-gray-600" : "bg-green-500"
              }
            `}
          ></div>
        </div>
        <span className="ml-3 text-gray-900 dark:text-gray-300">
          {darkMode ? "Dark Mode" : "Light Mode"}
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;
