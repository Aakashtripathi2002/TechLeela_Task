export default function SummaryPanel({ tasks }) {
  const total = tasks.length;
  const open = tasks.filter((t) => t.status === "Open").length;
  const progress = tasks.filter((t) => t.status === "In Progress").length;
  const done = tasks.filter((t) => t.status === "Done").length;

  const stats = [
    {
      label: "Total Tasks",
      value: total,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      gradient: "from-indigo-500 to-blue-600",
      bgGradient: "from-indigo-50 to-blue-50",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      label: "Open",
      value: open,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "from-slate-500 to-slate-600",
      bgGradient: "from-slate-50 to-slate-100",
      iconBg: "bg-slate-100",
      iconColor: "text-slate-600",
    },
    {
      label: "In Progress",
      value: progress,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-orange-50",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      label: "Completed",
      value: done,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "from-emerald-500 to-green-600",
      bgGradient: "from-emerald-50 to-green-50",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`relative bg-gradient-to-br ${stat.bgGradient} rounded-2xl shadow-md border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm overflow-hidden group`}
        >
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
                {stat.label}
              </p>
              <p className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </div>
            <div className={`${stat.iconBg} ${stat.iconColor} p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {stat.icon}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 bg-white/50 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-500`}
              style={{ width: total > 0 ? `${(stat.value / total) * 100}%` : '0%' }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}