import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/auth/users");
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks", { title, description, assignedTo, dueDate, priority });
      alert("✅ Task created successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating task");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      </div>

      <div className="relative bg-white shadow-2xl rounded-3xl w-full max-w-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm border border-gray-100">
        {/* Header with enhanced styling */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create New Task</h2>
            <p className="text-sm text-gray-600">Fill in the details to assign a new task</p>
          </div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-semibold bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-all duration-200 self-start sm:self-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        {/* Enhanced Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input with Icon */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Task Title *
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Complete project documentation"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-400"
              required
            />
          </div>

          {/* Description with Icon */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide detailed task description, requirements, and expectations..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-400 resize-none"
              rows="4"
            />
          </div>

          {/* Assigned To with enhanced dropdown */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Assign To *
            </label>
            <div className="relative">
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 appearance-none cursor-pointer"
                required
              >
                <option value="">Select a team member</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Due Date and Priority in Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Due Date */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900"
              />
            </div>

            {/* Priority */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
                Priority
              </label>
              <div className="relative">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 appearance-none cursor-pointer"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Priority Visual Indicator */}
          <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl p-4 border-2 border-dashed border-gray-200">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                priority === "High" ? "bg-red-500 animate-pulse" :
                priority === "Medium" ? "bg-yellow-500" :
                "bg-green-500"
              }`}></div>
              <span className="text-sm font-medium text-gray-700">
                Priority Level: <span className={`font-bold ${
                  priority === "High" ? "text-red-600" :
                  priority === "Medium" ? "text-yellow-600" :
                  "text-green-600"
                }`}>{priority}</span>
              </span>
            </div>
          </div>

          {/* Submit Button with enhanced styling */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
          >
            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Task
          </button>

          {/* Helper text */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Fields marked with * are required
          </p>
        </form>
      </div>
    </div>
  );
}