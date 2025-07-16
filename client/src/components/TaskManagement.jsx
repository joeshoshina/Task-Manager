import { useState } from "react";
import { Plus, Check, Clock, AlertCircle, Calendar } from "lucide-react";

const TaskManagement = ({ selectedDate, tasks, onAddTask, onDeleteTask }) => {
  const [newTask, setNewTask] = useState({ title: "", label: "normal" });
  const [showForm, setShowForm] = useState(false);

  const dateString = selectedDate.toISOString().split("T")[0];
  const todayTasks = tasks.filter((task) => task.date === dateString);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      onAddTask({
        ...newTask,
        date: dateString,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      });
      setNewTask({ title: "", label: "normal" });
      setShowForm(false);
    }
  };

  const getLabelColor = (label) => {
    switch (label) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "important":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "normal":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getLabelIcon = (label) => {
    switch (label) {
      case "urgent":
        return <AlertCircle className="w-4 h-4" />;
      case "important":
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          Tasks for{" "}
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter task title..."
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
          <div className="flex gap-3 mb-3">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="normal"
                checked={newTask.label === "normal"}
                onChange={(e) =>
                  setNewTask({ ...newTask, label: e.target.value })
                }
                className="text-green-500"
              />
              <span className="text-sm">Normal</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="important"
                checked={newTask.label === "important"}
                onChange={(e) =>
                  setNewTask({ ...newTask, label: e.target.value })
                }
                className="text-orange-500"
              />
              <span className="text-sm">Important</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="urgent"
                checked={newTask.label === "urgent"}
                onChange={(e) =>
                  setNewTask({ ...newTask, label: e.target.value })
                }
                className="text-red-500"
              />
              <span className="text-sm">Urgent</span>
            </label>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Task
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {todayTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No tasks for this date</p>
          </div>
        ) : (
          todayTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`
                    px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1
                    ${getLabelColor(task.label)}
                  `}
                >
                  {getLabelIcon(task.label)}
                  {task.label}
                </span>
                <span className="font-medium">{task.title}</span>
              </div>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="flex items-center gap-1 px-3 py-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                <Check className="w-4 h-4" />
                Complete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManagement;
