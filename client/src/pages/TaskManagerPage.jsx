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
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">
            Organize your tasks and stay productive
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 w-full h-full">
          {/* Left: Calendar + TaskManagement (stacked vertically) */}
          <div className="flex flex-col flex-1 gap-6">
            <Calendar
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              tasks={tasks}
            />
            <TaskManagement
              selectedDate={selectedDate}
              tasks={tasks}
              onAddTask={onAddTask}
              onDeleteTask={onDeleteTask}
            />
          </div>

          {/* Right: Finished Tasks Sidebar */}
          <div className="w-full lg:w-[300px]">
            <FinishedTasksSidebar
              finishedTasks={finishedTasks}
              onRemoveFinished={onRemoveFinished}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagerPage;
