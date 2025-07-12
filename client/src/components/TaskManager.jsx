import React, { useState } from "react";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-semibold mb-4 text-center">Task Manager</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-grow border px-3 py-2 rounded-lg"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={handleAddTask}
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center px-4 py-2 border rounded-lg ${
              task.completed ? "bg-green-100" : "bg-gray-50"
            }`}
          >
            <span
              className={`flex-grow cursor-pointer ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
              onClick={() => handleToggleComplete(task.id)}
            >
              {task.text}
            </span>
            <button
              className="text-red-500 hover:text-red-700 ml-2"
              onClick={() => handleDeleteTask(task.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
