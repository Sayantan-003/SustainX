import { Menu } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 shadow-sm">
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
            U
          </div>
          <div className="font-semibold text-lg">MaintainPro</div>
        </div>
      </div>

      <div className="p-4">
        <nav className="space-y-1 text-sm">
          <a className="flex items-center gap-3 p-2.5 rounded-lg bg-emerald-50 text-emerald-700 font-medium border border-emerald-200 cursor-pointer">
            <Menu className="w-4 h-4" />
            Work Orders
          </a>
          <a className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 cursor-pointer transition-colors">
            Preventive Maintenance
          </a>
          <a className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 cursor-pointer transition-colors">
            Scheduler
            <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              New
            </span>
          </a>
          <a className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 cursor-pointer transition-colors">
            Analytics
          </a>
          <a className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 cursor-pointer transition-colors">
            Requests
          </a>
        </nav>

        <div className="mt-6 border-t border-slate-200 pt-4 text-sm text-slate-500 space-y-2">
          <div className="hover:text-slate-700 cursor-pointer transition-colors">Locations</div>
          <div className="hover:text-slate-700 cursor-pointer transition-colors">Assets</div>
          <div className="hover:text-slate-700 cursor-pointer transition-colors">Parts & Inventory</div>
        </div>
      </div>
    </aside>
  );
}
