import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const TaskCard = ({ task, onDelete, showModal, closeModal, showPopUp }) => {
  return (
    <div className="bg-white rounded-xl border-l-[5px] border-yellow-500 shadow-lg p-5 m-2 w-[370px] transition-transform hover:scale-105 hover:shadow-2xl min-h-52">
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
          {task.completed ? "Completed" : "Pending"}
        </span>
      </p>
      <p className="text-sm text-gray-400">
        Created: {new Date(task.createdAt).toLocaleString()}
      </p>
      <div className="flex gap-x-[10px] mt-4 items-center">
        <Link
          to=""
          onClick={() => showModal(task)}
          className="text-white font-semibold bg-blue-600 p-2 w-20 text-center rounded-lg"
        >
          Edit
        </Link>
        <button
          onClick={() => {
            onDelete(task._id);
            toast.success("Task Deleted Successfully");
          }}
          className="text-white font-semibold bg-red-600 p-2 w-20 text-center rounded-lg"
        >
          Delete
        </button>
        <Link
          onClick={() => showPopUp(task)}
          className=" text-white  bg-green-600 px-1 py-2  text-[16px] text-sm text-center rounded-lg"
        >
          {task.completed ? "Mark Uncompleted" : "Mark Completed"}
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;
