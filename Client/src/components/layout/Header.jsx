// import { Search, Plus } from "lucide-react";

// export default function Header({ query, setQuery, openModal }) {
//   return (
//     <header className="flex items-center justify-between mb-6">
//       <h1 className="text-3xl font-bold text-slate-800">Work Orders</h1>
//       <div className="flex items-center gap-3">
//         <div className="relative">
//           <input
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search work orders..."
//             className="border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 w-72 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm transition-all"
//           />
//           <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
//         </div>

//         <button
//           onClick={openModal}
//           className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
//         >
//           <Plus className="w-4 h-4" /> Create Work Order
//         </button>
//       </div>
//     </header>
//   );
// }

//Header.jsx
import { ReactSVG } from "react-svg";
import closeIcon from "../../assets/left_panel_close_icon.svg";
import openIcon from "../../assets/left_panel_open_icon.svg";

export default function Header({
  query,
  setQuery,
  openModal,
  toggleSidebar,
  sidebarIsOpen,
}) {
  return (
    <div className="mb-6 border-b border-slate-200 pb-4">
      <div className="flex items-center justify-between">
        {/* Sidebar toggle + Title */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-slate-100 border border-slate-200 transition"
            aria-label={sidebarIsOpen ? "Close sidebar" : "Open sidebar"}
            title={sidebarIsOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarIsOpen ? (
              <ReactSVG
                src={closeIcon}
                beforeInjection={(svg) => {
                  svg.classList.add("w-7", "h-7", "text-slate-700");
                }}
              />
            ) : (
              <ReactSVG
                src={openIcon}
                beforeInjection={(svg) => {
                  svg.classList.add("w-7", "h-7", "text-slate-700");
                }}
              />
            )}
          </button>
          <h1 className="text-3xl font-sm text-slate-800">Work Orders</h1>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl border border-blue-600 hover:bg-blue-700 hover:border-blue-700 transition"
            title="Create new work order"
          >
            + Create Work Order
          </button>
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm w-48 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            aria-label="Search work orders"
          />
        </div>
      </div>
    </div>
  );
}

