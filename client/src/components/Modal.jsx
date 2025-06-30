import React from "react";

const Modal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white text-black w-[90vw] max-w-[800px] rounded-xl shadow-2xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-10 text-center">Add New Task</h2>
        <div className="flex flex-wrap items-center">
          <label className="mb-2" htmlFor="">
            Task Title
          </label>
          <input
            className=" w-full border border-black  p-2 outline-none rounded-lg"
            type="text"
            placeholder="Enter Task Title"
          />
        </div>
        <div className="flex flex-wrap">
          <label className="mb-2 mt-2" htmlFor="">
            Description
          </label>
          <textarea
            className="w-full min-h-[100px] p-2 border border-black outline-none rounded-lg"
            name=""
            id=""
            placeholder="Enter Description about task"
          ></textarea>
        </div>
        <div className="my-6">
          <div className="flex items-center gap-x-5">
            <label htmlFor="">Priority: </label>
            <div className="relative w-[400px]">
              <select
                className="w-[200px] p-3 pr-10 rounded-lg  text-[#232323]  border border-black bg-[#fff] outline-none font-medium text-[16px] appearance-none"
                defaultValue=""
              >
                <option value="" disabled hidden>
                  High
                </option>
                <option value="">High</option>
                <option value="">Low</option>
                <option value="">Medium</option>
                
              </select>
              <div className="absolute top-1/2 right-25 -translate-y-1/2 pointer-events-none  text-[#011F5B] text-sm">
                ▼
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
