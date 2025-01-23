import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year
  return (
    <footer className="bg-green-200 dark:bg-gray-800 shadow-lg mt-8">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-left text-gray-700 dark:text-gray-200">
          &copy; <span></span> 2025| Developed and designed by Pradeep
          Kaliyawansha.
        </p>
        <p className="text-center text-gray-700 dark:text-gray-200">
          © {currentYear} Dashboard App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
