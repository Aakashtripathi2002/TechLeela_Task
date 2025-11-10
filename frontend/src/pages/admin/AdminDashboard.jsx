import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import TaskFilters from "./TaskFilters";
import SummaryPanel from "./SummaryPanel";

export default function AdminDashboard() {
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ totalPages: 1 });
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    assignedTo: "",
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleEdit = (id) => {
    navigate(`/update-task/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${id}`);
        setTasks((prev) => prev.filter((t) => t.id !== id));
        alert("Task deleted successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to delete task. Try again!");
      }
    }
  };

  // Fetch users and tasks
  useEffect(() => {
    const fetchData = async () => {
      const usersRes = await api.get("/auth/users");
      const tasksRes = await api.get("/tasks", {
        params: { ...filters, page, limit: 6 },
      });
      setUsers(usersRes.data);
      setTasks(tasksRes.data.tasks);
      setPagination(tasksRes.data.pagination);
    };
    fetchData();
  }, [filters, page]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-600 font-medium">
                Manage and monitor all tasks across your organization
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/create-task"
                className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Task
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-8">
          <SummaryPanel tasks={tasks} />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <TaskFilters
            filters={filters}
            setFilters={setFilters}
            users={users}
          />
        </div>

        {/* Task Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              All Tasks
              <span className="ml-3 text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
              </span>
            </h2>
          </div>

          {tasks.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 text-center backdrop-blur-sm bg-white/80">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full mb-4">
                <svg
                  className="w-10 h-10 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                No tasks found
              </h3>
              <p className="text-slate-600">
                Get started by creating a new task or adjust your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="group bg-white rounded-2xl shadow-md border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm bg-white/80"
                >
                  {/* Task Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-800 line-clamp-2 flex-1 mr-2 group-hover:text-indigo-600 transition-colors">
                      {task.title}
                    </h3>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-sm ${
                        task.priority === "High"
                          ? "bg-gradient-to-r from-red-500 to-rose-500 text-white"
                          : task.priority === "Medium"
                          ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white"
                          : "bg-gradient-to-r from-emerald-400 to-green-400 text-white"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  {/* Task Description */}
                  <p className="text-sm text-slate-600 mb-5 line-clamp-3 leading-relaxed">
                    {task.description}
                  </p>

                  {/* Task Meta Info */}
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center text-sm bg-slate-50 rounded-lg p-2.5">
                      <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-lg mr-3">
                        <svg
                          className="w-4 h-4 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 font-medium">
                          Assigned to
                        </span>
                        <span className="text-sm text-slate-800 font-semibold">
                          {users.find((u) => u.id === task.assignedTo)?.name ||
                            "Unassigned"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-sm bg-slate-50 rounded-lg p-2.5">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mr-3">
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 font-medium">
                          Due date
                        </span>
                        <span className="text-sm text-slate-800 font-semibold">
                          {task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString()
                            : "No due date"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Task Status + Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                        Status:
                      </span>
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm ${
                          task.status === "Done"
                            ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                            : task.status === "In Progress"
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                            : "bg-gradient-to-r from-slate-400 to-slate-500 text-white"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(task.id)}
                        className="px-3 py-1.5 text-xs font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="px-3 py-1.5 text-xs font-semibold bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-8 gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                page === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-500 text-white hover:bg-indigo-600"
              }`}
            >
              Previous
            </button>

            <span className="px-4 py-2 bg-white border rounded-lg text-sm font-semibold">
              Page {page} of {pagination.totalPages}
            </span>

            <button
              disabled={page === pagination.totalPages}
              onClick={() => setPage(page + 1)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                page === pagination.totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-500 text-white hover:bg-indigo-600"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
