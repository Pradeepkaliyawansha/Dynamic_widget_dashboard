import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import WidgetChart from "./ChartWidget";
import WidgetText from "./TextWidget";
import WidgetList from "./ListWidget";
import WidgetImage from "./ImageWidget";

const Dashboard = () => {
  const [widgets, setWidgets] = useState(() => {
    const savedWidgets = localStorage.getItem("dashboardWidgets");
    return savedWidgets
      ? JSON.parse(savedWidgets)
      : [
          { id: "1", type: "chart", width: "w-full md:w-1/2", height: "h-64" },
          { id: "2", type: "text", width: "w-full md:w-1/2", height: "h-48" },
          { id: "3", type: "list", width: "w-full md:w-1/2", height: "h-64" },
          { id: "4", type: "image", width: "w-full md:w-1/2", height: "h-48" },
        ];
  });

  useEffect(() => {
    localStorage.setItem("dashboardWidgets", JSON.stringify(widgets));
  }, [widgets]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWidgets(items);
  };

  const removeWidget = (widgetId) => {
    setWidgets(widgets.filter((widget) => widget.id !== widgetId));
  };

  const addWidget = (type) => {
    const newWidget = {
      id: Date.now().toString(),
      type,
      width: "w-full md:w-1/2",
      height: "h-48",
    };
    setWidgets([...widgets, newWidget]);
  };

  const updateWidgetSize = (widgetId, newSize) => {
    setWidgets(
      widgets.map((widget) =>
        widget.id === widgetId ? { ...widget, size: newSize } : widget
      )
    );
  };

  return (
    <div className="min-h-screen dark:bg-gray-800 bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold dark:text-gray-100  text-black">
            Dashboard
          </h1>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <button
              onClick={() => addWidget("chart")}
              className="w-full sm:w-auto px-4 py-2 rounded-lg 
                        bg-green-500 dark:bg-green-700 
                        dark:text-white text-black 
                        hover:bg-green-600 dark:hover:bg-green-800
                        focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50
                        transition-all duration-300 ease-in-out
                        active:scale-95"
            >
              Add Chart
            </button>
            <button
              onClick={() => addWidget("text")}
              className="w-full sm:w-auto px-4 py-2 rounded-lg 
                        bg-purple-500 dark:bg-purple-700 
                        dark:text-white text-black 
                        hover:bg-purple-600 dark:hover:bg-purple-800
                        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
                        transition-all duration-300 ease-in-out
                        active:scale-95"
            >
              Add Text
            </button>
            <button
              onClick={() => addWidget("image")}
              className="w-full sm:w-auto px-4 py-2 rounded-lg 
                        bg-orange-500 dark:bg-orange-700 
                         dark:text-white text-black 
                        hover:bg-orange-600 dark:hover:bg-orange-800
                        focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50
                        transition-all duration-300 ease-in-out
                        active:scale-95"
            >
              Add Image
            </button>
            <button
              onClick={() => addWidget("list")}
              className="w-full sm:w-auto px-4 py-2 rounded-lg 
                        bg-blue-500 dark:bg-blue-700 
                        dark:text-white text-black 
                        hover:bg-blue-600 dark:hover:bg-blue-800
                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                        transition-all duration-300 ease-in-out
                        active:scale-95"
            >
              Add List
            </button>
          </div>
        </div>

        {/* Widget Grid */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable
            isDropDisabled={false}
            isCombineEnabled={false}
            ignoreContainerClipping={false}
            droppableId="dashboard-widgets"
            direction="vertical"
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid gap-4"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(12, 1fr)",
                  gridAutoRows: "minmax(min-content, max-content)",
                }}
              >
                {widgets.map((widget, index) => (
                  <Draggable
                    key={widget.id}
                    draggableId={widget.id}
                    index={index}
                  >
                    {(provided, snapshot) => {
                      let colSpan;
                      switch (widget.size) {
                        case "small":
                          colSpan = "col-span-4"; // 1/3 width
                          break;
                        case "large":
                          colSpan = "col-span-12"; // full width
                          break;
                        default: // medium
                          colSpan = "col-span-6"; // 1/2 width
                      }

                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${colSpan} transition-all duration-300 ${
                            snapshot.isDragging ? "opacity-50" : ""
                          }`}
                        >
                          {widget.type === "chart" && (
                            <WidgetChart
                              id={widget.id}
                              onRemove={() => removeWidget(widget.id)}
                              size={widget.size}
                              onSizeChange={(newSize) =>
                                updateWidgetSize(widget.id, newSize)
                              }
                            />
                          )}
                          {widget.type === "text" && (
                            <WidgetText
                              id={widget.id}
                              onRemove={() => removeWidget(widget.id)}
                              size={widget.size}
                              onSizeChange={(newSize) =>
                                updateWidgetSize(widget.id, newSize)
                              }
                            />
                          )}
                          {widget.type === "list" && (
                            <WidgetList
                              id={widget.id}
                              onRemove={() => removeWidget(widget.id)}
                              size={widget.size}
                              onSizeChange={(newSize) =>
                                updateWidgetSize(widget.id, newSize)
                              }
                            />
                          )}
                          {widget.type === "image" && (
                            <WidgetImage
                              id={widget.id}
                              onRemove={() => removeWidget(widget.id)}
                              size={widget.size}
                              onSizeChange={(newSize) =>
                                updateWidgetSize(widget.id, newSize)
                              }
                            />
                          )}
                        </div>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Dashboard;
