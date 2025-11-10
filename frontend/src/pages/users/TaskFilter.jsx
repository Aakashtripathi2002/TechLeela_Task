import { useState } from "react";

export default function TaskFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({ status: "", priority: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
      <div className="flex flex-wrap gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Status
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Priority
          </label>
          <select
            name="priority"
            value={filters.priority}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          setFilters({ status: "", priority: "" });
          onFilterChange({ status: "", priority: "" });
        }}
        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-semibold text-gray-700 transition"
      >
        Reset
      </button>
    </div>
  );
}