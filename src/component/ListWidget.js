import React, { useState, useEffect } from "react";

const WidgetList = ({ id, onRemove }) => {
  const [items, setItems] = useState(() => {
    // Retrieve saved items from localStorage using widget-specific key
    const savedItems = localStorage.getItem(`widgetList-${id}`);
    return savedItems
      ? JSON.parse(savedItems)
      : [
          { id: 1, text: "Task 1", completed: false },
          { id: 2, text: "Task 2", completed: true },
          { id: 3, text: "Task 3", completed: false },
        ];
  });

  const [newItem, setNewItem] = useState("");

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`widgetList-${id}`, JSON.stringify(items));
  }, [items, id]);

  const toggleItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setItems([...items, { id: Date.now(), text: newItem, completed: false }]);
    setNewItem("");
  };

  return (
    <div
      className="h-full p-4 rounded-lg dark:bg-gray-700 dark:text-white bg-white text-gray-800
     shadow-lg transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">List Widget</h3>
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

      <form onSubmit={addItem} className="mb-4 flex gap-2">
        <input
          type="text"
          required
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="flex-1 p-2 rounded border
              dark:bg-gray-600 dark:border-gray-500
              bg-gray-50 border-gray-300"
          placeholder="Add new item"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleItem(item.id)}
              className="w-4 h-4"
            />
            <span
              className={item.completed ? "line-through text-gray-500" : ""}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetList;
