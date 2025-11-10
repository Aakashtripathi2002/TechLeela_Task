import { useEffect, useState, useContext } from "react";
import api from "../../services/api.js";
import { AuthContext } from "../../context/AuthContext";
import TaskFilter from "./TaskFilter";

export default function UserDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ totalPages: 1 });
  const [filters, setFilters] = useState({ status: "", priority: "" });

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const { data } = await api.get("/tasks/user", {
          params: {
            userId: user.id,
            page,
            limit: 6,
            status: filters.status,
            priority: filters.priority,
          },
        });
        setTasks(data.tasks);
        setPagination(data.pagination);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchUserTasks();
  }, [user.id, page, filters]);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/tasks/${id}`, { status });
      setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  const total = tasks.length;
  const open = tasks.filter((t) => t.status === "Open").length;
  const progress = tasks.filter((t) => t.status === "In Progress").length;
  const done = tasks.filter((t) => t.status === "Done").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Navbar with better mobile responsive */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white shadow-lg backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h1 className="text-lg sm:text-xl font-bold hidden sm:block">User Dashboard</h1>
              <h1 className="text-lg font-bold sm:hidden">Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold leading-tight">{user.name}</p>
                  <p className="text-xs text-white/80 leading-tight">{user.role}</p>
                </div>
              </div>
              
              <div className="md:hidden flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20">
                <div className="w-7 h-7 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
              
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 active:bg-red-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span className="hidden sm:inline">Logout</span>
                <svg className="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Filters - Enhanced mobile view */}
        <div className="mb-6 sm:mb-8">
          <TaskFilter onFilterChange={setFilters} />
        </div>

        {/* Enhanced Summary Cards with animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Tasks</h3>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900">{total}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Open</h3>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900">{open}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">In Progress</h3>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900">{progress}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Completed</h3>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900">{done}</p>
          </div>
        </div>

        {/* Enhanced Task Cards with better mobile layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1 hover:border-indigo-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight pr-2 flex-1">
                    {task.title}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${
                      task.priority === "High"
                        ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md"
                        : task.priority === "Medium"
                        ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md"
                        : "bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-md"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {task.description || "No description provided."}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 bg-gray-50 rounded-lg px-3 py-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">
                    Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-gray-100">
                  <span
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
                      task.status === "Done"
                        ? "bg-emerald-100 text-emerald-700"
                        : task.status === "In Progress"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {task.status}
                  </span>

                  <select
                    value={task.status}
                    onChange={(e) => updateStatus(task.id, e.target.value)}
                    className="w-full sm:w-auto border-2 border-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white font-medium text-gray-700 hover:border-indigo-300 transition-colors cursor-pointer"
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="bg-white rounded-2xl p-12 sm:p-16 text-center shadow-lg border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Tasks Yet</h3>
                <p className="text-gray-600">You have no assigned tasks at the moment.</p>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Pagination with better mobile view */}
        <div className="flex flex-col sm:flex-row justify-center items-center mt-8 sm:mt-10 gap-3 sm:gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
              page === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <div className="bg-white border-2 border-indigo-100 rounded-xl px-6 py-3 text-sm font-bold text-gray-900 shadow-md">
            Page <span className="text-indigo-600">{page}</span> of{" "}
            <span className="text-indigo-600">{pagination.totalPages}</span>
          </div>

          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage(page + 1)}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
              page === pagination.totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            }`}
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}