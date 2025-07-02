import { useState } from "react";
import addTask from "../services/addTask";
import { addSingleTask } from "../utils/taskSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateTask } from "../utils/taskSlice";
const Modal = ({ onClose, editTask, mode = "create", task = null }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");

  const payload = { title, description, priority };

  /**
   * Handle Add Task Function
   */
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        const response = await addTask(payload);
        toast.success("Task Added Successfully");
        dispatch(addSingleTask(response));
        console.log("added task is", response);
      } else if (mode === "edit") {
        const response = await editTask(task._id, payload);
        console.log("update task is", response);
        dispatch(updateTask(response)); // You'll need this reducer
        toast.success("Task updated successfully!");
      }

      onClose();
    } catch (err) {
      console.log("Error in adding the task", err);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white text-black w-[90vw] max-w-[800px] rounded-2xl shadow-2xl p-10 relative transition-all duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-gray-700 transition duration-200"
        >
          &times;
        </button>
        <h2 className="text-3xl font-extrabold mb-10 text-center text-[#232323] tracking-wide">
          {mode === "create" ? "Add New Task" : "Edit Task"}
        </h2>

        <form action="" onSubmit={handleAddTask}>
          <div className="flex flex-wrap mb-6">
            <label
              className="mb-2 text-[#232323] font-semibold w-full"
              htmlFor=""
            >
              Task Title
            </label>
            <input
              className="w-full border border-[#232323] p-3 outline-none rounded-lg focus:ring-2 focus:ring-green-500 transition duration-150"
              type="text"
              placeholder="Enter Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap mb-6">
            <label
              className="mb-2 text-[#232323] font-semibold w-full"
              htmlFor=""
            >
              Description
            </label>
            <textarea
              className="w-full min-h-[120px] p-3 border border-[#232323] outline-none rounded-lg resize-none focus:ring-2 focus:ring-green-500 transition duration-150"
              placeholder="Enter Description about task"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="my-6 flex flex-col md:flex-row justify-between gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <label className="text-[#232323] font-semibold whitespace-nowrap">
                Priority:
              </label>
              <div className="relative w-full md:w-[200px]">
                <select
                  className="w-full p-3 pr-10 rounded-lg text-[#232323] border border-[#232323] bg-white outline-none font-medium text-[16px] appearance-none"
                  defaultValue=""
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Medium
                  </option>
                  <option value="high">High</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                </select>
                <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none text-[#232323] text-sm">
                  ▼
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <label className="text-[#232323] font-semibold whitespace-nowrap">
                Due Date:
              </label>
              <input
                type="date"
                className="border border-[#232323] w-full md:w-[160px] p-3 rounded-lg outline-none"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-around mt-10 gap-4">
            <button
              onClick={onClose}
              className="bg-red-600 px-6 py-3 rounded-lg text-white font-semibold hover:bg-red-700 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 px-6 py-3 rounded-lg text-white font-semibold hover:bg-green-700 transition duration-200"
            >
              {mode === "create" ? "Create Task" : "Edit Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
