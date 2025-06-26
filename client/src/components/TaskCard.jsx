import React from "react";

const TaskCard = ({ task }) => {
  return (
    
    <div className="bg-white rounded-xl shadow-lg p-6 m-2 w-[450px] transition-transform hover:scale-105 hover:shadow-2xl ">
      <h2 className="text-xl font-bold mb-2 text-gray-800">{task.title}</h2>
      <p className="mb-1 text-gray-600">{task.description}</p>
      <p className="mb-1">
        <span className="font-semibold text-gray-700">Priority:</span>{" "}
        <span
          className={
            task.priority === "high"
              ? "text-red-500"
              : task.priority === "medium"
              ? "text-yellow-500"
              : "text-green-500"
          }
        >
          {task.priority}
        </span>
      </p>
      <p className="mb-1">
        <span className="font-semibold text-gray-700">Completed:</span>{" "}
        <span className={task.completed ? "text-green-600" : "text-red-600"}>
          {task.completed ? "Yes" : "No"}
        </span>
      </p>
      <p className="text-sm text-gray-400">
        Created: {new Date(task.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default TaskCard;
