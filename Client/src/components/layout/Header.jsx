import { Search, Plus } from "lucide-react";

export default function Header({ query, setQuery, openModal }) {
  return (
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold text-slate-800">Work Orders</h1>
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search work orders..."
            className="border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 w-72 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm transition-all"
          />
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
        </div>

        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-4 h-4" /> Create Work Order
        </button>
      </div>
    </header>
  );
}
