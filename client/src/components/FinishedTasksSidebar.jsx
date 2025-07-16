import { Check, X } from "lucide-react";

const FinishedTasksSidebar = ({ finishedTasks, onRemoveFinished }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-fit">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Check className="w-5 h-5 text-green-500" />
        Completed Tasks
      </h2>

      <div className="space-y-3">
        {finishedTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Check className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No completed tasks yet</p>
          </div>
        ) : (
          finishedTasks.map((task) => (
            <div
              key={task.id}
              className="p-3 bg-green-50 border border-green-200 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-green-800">{task.title}</p>
                  <p className="text-sm text-green-600">
                    {new Date(task.date).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => onRemoveFinished(task.id)}
                  className="text-red-500 hover:bg-red-50 p-1 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {finishedTasks.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Total completed: {finishedTasks.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default FinishedTasksSidebar;
