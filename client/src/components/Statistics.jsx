import React from 'react'

const Statistics = ({ totalCount, completedCount, pendingCount }) => {
  return (
    <div className="flex justify-around items-center mt-10 bg-white rounded-xl shadow-lg py-8 px-4">
      <h1 className="text-2xl font-bold text-indigo-700">Quick Stats</h1>
      <p className="bg-indigo-50 rounded-lg px-6 py-3 text-lg font-semibold text-gray-700 shadow-sm border border-indigo-100">
        Total: <span className="text-indigo-600">{totalCount}</span>
      </p>
      <p className="bg-green-50 rounded-lg px-6 py-3 text-lg font-semibold text-gray-700 shadow-sm border border-green-100">
        Completed: <span className="text-green-600">{completedCount}</span>
      </p>
      <p className="bg-yellow-50 rounded-lg px-6 py-3 text-lg font-semibold text-gray-700 shadow-sm border border-yellow-100">
        Pending: <span className="text-yellow-600">{pendingCount}</span>
      </p>
    </div>
  );
};

export default Statistics