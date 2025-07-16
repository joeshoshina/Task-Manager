import React, { useState } from "react";
import Calendar from "../components/Calendar.jsx";
import TaskManagement from "../components/TaskManagement.jsx";
import FinishedTasksSidebar from "../components/FinishedTasksSidebar.jsx";

const TaskManagerPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);

  const onAddTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const onDeleteTask = (taskId) => {
    const taskToComplete = tasks.find((task) => task.id === taskId);
    if (taskToComplete) {
      setFinishedTasks((prev) => [
        ...prev,
        { ...taskToComplete, completedAt: new Date().toISOString() },
      ]);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
  };

  const onRemoveFinished = (taskId) => {
    setFinishedTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">
            Organize your tasks and stay productive
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar - spans 2 columns on large screens */}
          <div className="lg:col-span-2">
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              tasks={tasks}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FinishedTasksSidebar
              finishedTasks={finishedTasks}
              onRemoveFinished={onRemoveFinished}
            />
          </div>

          {/* Task Management - spans 3 columns on large screens */}
          <div className="lg:col-span-3">
            <TaskManagement
              selectedDate={selectedDate}
              tasks={tasks}
              onAddTask={onAddTask}
              onDeleteTask={onDeleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagerPage;
