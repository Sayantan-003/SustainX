import { Filter } from "lucide-react";

export default function WorkOrderFilters({
  showFilters,
  setShowFilters,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  query,
  clearFilters,
  resultCount,
}) {
  return (
    <div className="p-4 border-b border-slate-200 bg-slate-50">
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors shadow-sm"
        >
          <Filter className="w-4 h-4" /> {showFilters ? "Hide" : "Show"} Filters
        </button>

        {showFilters && (
          <>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-300 rounded-lg px-4 py-2 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            >
              <option>All</option>
              <option>Open</option>
              <option>Closed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border border-slate-300 rounded-lg px-4 py-2 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            >
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            {(statusFilter !== "All" || priorityFilter !== "All" || query) && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium ml-2 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </>
        )}

        <div className="ml-auto text-sm text-slate-600 font-medium">
          {resultCount} {resultCount === 1 ? "Result" : "Results"}
        </div>
      </div>
    </div>
  );
}
