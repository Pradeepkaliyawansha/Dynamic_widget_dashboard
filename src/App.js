import React from "react";
import Dashboard from "./component/Dashboard";
import Footer from "./component/Footer";
import Header from "./component/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Dashboard />
      </main>

      <Footer />
    </div>
  );
}

export default App;
