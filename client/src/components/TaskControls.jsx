import React from "react";
import Modal from "./Modal";
import { useState } from "react";
const TaskControls = ({ showModal, onFilterChange, onSortChange }) => {
  return (
    <div className="pt-16 pb-4 flex justify-between items-center gap-x-4">
      <div className="relative w-[400px]">
        <select
          className="w-[450px] p-4  rounded-lg  text-[#232323] bg-[#fff] outline-none font-medium text-[16px] appearance-none"
          defaultValue=""
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="" disabled hidden>
            Filter
          </option>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <div className="absolute top-1/2 -right-8 -translate-y-1/2 pointer-events-none  text-[#232323]  text-sm">
          ▼
        </div>
      </div>
      <div className="relative w-[400px]">
        <select
          className="w-[450px] p-4  rounded-lg  text-[#232323]  bg-[#fff] outline-none font-medium text-[16px] appearance-none"
          defaultValue=""
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="" disabled hidden>
            Sort
          </option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priority-high-low">Priority: High to Low</option>
          <option value="priority-low-high">Priority: Low to High</option>
          <option value="completed-first">Completed First</option>
          <option value="pending-first">Pending First</option>
        </select>
        <div className="absolute top-1/2 -right-8 -translate-y-1/2 pointer-events-none  text-[#011F5B] text-sm">
          ▼
        </div>
      </div>
      <button
        onClick={() => showModal(true)}
        className="bg-[#BDE037] p-3 rounded-lg font-normal text-xl text-[#232323]"
      >
        Add New Task
      </button>
    </div>
  );
};

export default TaskControls;
