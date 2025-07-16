import { Calendar as CalendarIcon } from "lucide-react";

const Calendar = ({ selectedDate, onDateChange, tasks }) => {
  const today = new Date();
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [];

  // Empty cells for days before the first day of the month
  for (let i = 0; i < startingDay; i++) {
    days.push(<div key={`empty-${i}`} className="p-2"></div>);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dateString = date.toISOString().split("T")[0];
    const dayTasks = tasks.filter((task) => task.date === dateString);
    const isSelected = selectedDate.toDateString() === date.toDateString();
    const isToday = today.toDateString() === date.toDateString();

    days.push(
      <div
        key={day}
        onClick={() => onDateChange(date)}
        className={`
          p-2 cursor-pointer rounded-lg border transition-all
          ${
            isSelected
              ? "bg-blue-500 text-white border-blue-500"
              : "border-gray-200 hover:bg-gray-50"
          }
          ${isToday && !isSelected ? "border-blue-300 bg-blue-50" : ""}
        `}
      >
        <div className="text-sm font-medium">{day}</div>
        {dayTasks.length > 0 && (
          <div className="flex gap-1 mt-1">
            {dayTasks.slice(0, 3).map((task, idx) => (
              <div
                key={idx}
                className={`
                  w-2 h-2 rounded-full
                  ${
                    task.label === "urgent"
                      ? "bg-red-400"
                      : task.label === "important"
                      ? "bg-orange-400"
                      : "bg-green-400"
                  }
                `}
              />
            ))}
            {dayTasks.length > 3 && (
              <div className="text-xs text-gray-500">
                +{dayTasks.length - 3}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() =>
              onDateChange(new Date(currentYear, currentMonth - 1, 1))
            }
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Prev
          </button>
          <button
            onClick={() =>
              onDateChange(new Date(currentYear, currentMonth + 1, 1))
            }
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{days}</div>
    </div>
  );
};

export default Calendar;
