import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  return (
    <nav className={"bg-green-200 dark:bg-gray-800 shadow-lg"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              My Dashboard
            </span>
          </div>
          {/* add toggle button to change the theme */}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
