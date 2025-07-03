import React from "react";

const TaskCompletionModal = ({ closeModal, onConfirm, task }) => {
  if (!task) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white text-black w-[40vw] max-w-[800px] rounded-2xl shadow-2xl p-10 relative transition-all duration-300">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-gray-700 transition duration-200"
        >
          &times;
        </button>
        <p className="text-medium text-[#232323]">
          {task.completed
            ? " Are you sure you want to unmark the task as completed"
            : " Are you sure you want to mark the task as completed"}
        </p>
        <div className="flex gap-x-4 items-center justify-center mt-7">
          <button
            onClick={() => onConfirm(task._id)}
            className="text-white font-semibold bg-green-600 p-2 w-20 text-center rounded-lg"
          >
            Yes
          </button>
          <button
            onClick={closeModal}
            className="text-white font-semibold bg-red-600 p-2 w-20 text-center rounded-lg"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCompletionModal;
