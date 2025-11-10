import React from "react";
export default function TaskFilters({ filters, setFilters, users }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-wrap gap-4 items-end">
      {" "}
      <div>
        {" "}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>{" "}
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
        >
          {" "}
          <option value="">All</option> <option>Open</option>{" "}
          <option>In Progress</option> <option>Done</option>{" "}
        </select>{" "}
      </div>{" "}
      <div>
        {" "}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>{" "}
        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
        >
          {" "}
          <option value="">All</option> <option>Low</option>{" "}
          <option>Medium</option> <option>High</option>{" "}
        </select>{" "}
      </div>{" "}
      <div>
        {" "}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Assignee
        </label>{" "}
        <select
          value={filters.assignedTo}
          onChange={(e) =>
            setFilters({ ...filters, assignedTo: e.target.value })
          }
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
        >
          {" "}
          <option value="">All</option>{" "}
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {" "}
              {u.name}{" "}
            </option>
          ))}{" "}
        </select>{" "}
      </div>{" "}
      <button
        onClick={() => setFilters({ status: "", priority: "", assignedTo: "" })}
        className="bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 text-sm font-medium"
      >
        {" "}
        Reset{" "}
      </button>{" "}
    </div>
  );
}
