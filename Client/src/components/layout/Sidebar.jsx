import {
  Wrench,
  ClipboardList,
  BarChart3,
  CalendarClock,
  Layers,
  MessageSquare,
  Tag,
  Package,
  BookOpen,
  Gauge,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-full h-full bg-white border-r border-slate-200 flex flex-col overflow-hidden">
      {/* Logo / App Name */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center bg-gradient-to-br from-blue-600 to-teal-600 w-9 h-9 mt-1 mb-1 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-110">
            <Wrench className="w-8 h-8 text-white" />
          </div>
          <div className="font-semibold text-sm">MaintainPro</div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="p-4">
        <nav className="space-y-1 text-sm">
          <a className="flex items-center gap-3 p-2.5 rounded-lg bg-emerald-50 text-emerald-700 font-medium border border-emerald-200 cursor-pointer">
            <ClipboardList className="w-5 h-5" />
            Work Orders
          </a>
          <a className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 cursor-pointer transition-colors">
            <CalendarClock className="w-5 h-5" />
            Preventive Maintenance
          </a>
          <a className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 cursor-pointer transition-colors">
            <Layers className="w-5 h-5" />
            Scheduler
          </a>
          <a className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 cursor-pointer transition-colors">
            <BarChart3 className="w-5 h-5" />
            Analytics
          </a>
          <a className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 cursor-pointer transition-colors">
            <MessageSquare className="w-5 h-5" />
            Requests
          </a>
        </nav>

        {/* Secondary Section */}
        <div className="mt-6 border-t border-slate-200 pt-4 text-sm text-slate-500 space-y-5">
          <div className="flex items-center gap-3 hover:text-slate-700 cursor-pointer transition-colors">
            <Tag className="w-5 h-5" />
            Categories
          </div>
          <div className="flex items-center gap-3 hover:text-slate-700 cursor-pointer transition-colors">
            <Package className="w-5 h-5" />
            Parts & Inventory
          </div>
          <div className="flex items-center gap-3 hover:text-slate-700 cursor-pointer transition-colors">
            <BookOpen className="w-5 h-5" />
            Library
          </div>
          <div className="flex items-center gap-3 hover:text-slate-700 cursor-pointer transition-colors">
            <Gauge className="w-5 h-5" />
            Meters
          </div>
        </div>
      </div>
    </aside>
  );
}
