import React from "react";
import Modal from "./Modal";
import { useState } from "react";
const TaskControls = ({showModal}) => {

  return (
    <div className="pt-16 pb-4 flex justify-between items-center gap-x-4">
      <div className="relative w-[400px]">
        <select
          className="w-[450px] p-4  rounded-lg  text-[#232323] bg-[#fff] outline-none font-medium text-[16px] appearance-none"
          defaultValue=""
        >
          <option value="" disabled hidden>
            Filter
          </option>
          <option value="">All</option>
          <option value="">Completed</option>
          <option value="">Pending</option>
          <option value="">High Priority</option>
          <option value="">Medium Priority</option>
          <option value="">Low Priority</option>
        </select>
        <div className="absolute top-1/2 -right-8 -translate-y-1/2 pointer-events-none  text-[#232323]  text-sm">
          ▼
        </div>
      </div>
      <div className="relative w-[400px]">
        <select
          className="w-[450px] p-4  rounded-lg  text-[#232323]  bg-[#fff] outline-none font-medium text-[16px] appearance-none"
          defaultValue=""
        >
          <option value="" disabled hidden>
            Sort
          </option>
          <option value="">Newest First</option>
          <option value="">Oldest First</option>
          <option value="">Priority: High to Low</option>
          <option value="">Priority: Low to High</option>
          <option value="">Completed First</option>
          <option value="">Pending First</option>
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
