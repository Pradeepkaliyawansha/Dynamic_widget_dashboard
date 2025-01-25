import React, { useState, useEffect, useRef } from "react";
import { Expand, Edit, Trash2 } from "lucide-react";

const WidgetList = ({ id, onRemove }) => {
  const [size, setSize] = useState(() => {
    const savedSize = localStorage.getItem(`widgetListSize-${id}`);
    return savedSize || "medium";
  });

  const [items, setItems] = useState(() => {
    // Retrieve saved items from localStorage using widget-specific key
    const savedItems = localStorage.getItem(`widgetList-${id}`);
    return savedItems
      ? JSON.parse(savedItems)
      : [
          { id: 1, text: "Task 1", completed: false },
          { id: 2, text: "Task 2", completed: false },
          { id: 3, text: "Task 3", completed: false },
        ];
  });

  const [editingItem, setEditingItem] = useState(null);

  const sizeClasses = {
    small: "w-64 h-64",
    medium: "w-80 h-80",
    large: "w-150 h-96",
  };

  const [newItem, setNewItem] = useState("");
  const listRef = useRef(null);

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`widgetList-${id}`, JSON.stringify(items));
    localStorage.setItem(`widgetListSize-${id}`, size);
  }, [items, size, id]);

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

  const startEditItem = (item) => {
    setEditingItem({ ...item });
  };

  const updateItem = () => {
    if (!editingItem.text.trim()) return;
    setItems(
      items.map((item) =>
        item.id === editingItem.id ? { ...editingItem } : item
      )
    );
    setEditingItem(null);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const toggleSize = () => {
    const sizes = ["small", "medium", "large"];
    const currentIndex = sizes.indexOf(size);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setSize(sizes[nextIndex]);
  };

  // Dynamic height calculation
  const getHeightClass = () => {
    const baseHeight = size === "small" ? 64 : size === "medium" ? 80 : 150;
    const itemCount = items.length;
    const additionalHeight = Math.min(itemCount * 40, 200); // Cap additional height
    return `h-[${baseHeight + additionalHeight}px]`;
  };

  return (
    <div
      className={`p-4 rounded-lg dark:bg-gray-700 dark:text-white bg-white text-gray-800 shadow-lg transition-all duration-300 ${
        sizeClasses[size]
      } ${getHeightClass()}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">List Widget</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSize}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
            title="Change Size"
          >
            <Expand className="w-5 h-5" />
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

      <form onSubmit={addItem} className="mb-4 flex gap-2 ">
        <input
          type="text"
          required
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="w-full p-2 rounded border 
      dark:bg-gray-600 dark:border-gray-500 dark:text-white 
      bg-gray-50 border-gray-300 text-gray-800 
      focus:ring-2 focus:ring-blue-500 focus:border-transparent 
      hover:border-blue-300"
          placeholder="Add new item "
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      <ul
        ref={listRef}
        className="space-y-2 overflow-auto max-h-[calc(100%-150px)]"
      >
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-2">
            {editingItem && editingItem.id === item.id ? (
              <div className="flex items-center w-full gap-2">
                <input
                  type="text"
                  value={editingItem.text}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, text: e.target.value })
                  }
                  className="w-full p-2 rounded border 
                            dark:bg-gray-600 dark:border-gray-500 dark:text-white 
                            bg-gray-50 border-gray-300 text-gray-800 
                            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                            hover:border-blue-300"
                />
                <button
                  onClick={updateItem}
                  className="text-green-500 hover:bg-green-100 p-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingItem(null)}
                  className="text-red-500 hover:bg-red-100 p-1 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleItem(item.id)}
                  className="w-4 h-4"
                />
                <span
                  className={`flex-grow ${
                    item.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {item.text}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEditItem(item)}
                    className="text-blue-500 hover:bg-blue-100 p-1 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500 hover:bg-red-100 p-1 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetList;
