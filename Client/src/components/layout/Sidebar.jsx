import { useState, useRef, useEffect } from "react";
import {
  Wrench,
  ClipboardList,
  BarChart3,
  CalendarClock,
  Layers,
  MessageSquare,
  Tag,
  Gem,
  Package,
  BookOpen,
  Gauge,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext"

export default function Sidebar() {
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const menuRef = useRef(null);
  const { user, logout } = useAuth();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowLogoutMenu(false);
      }
    };

    if (showLogoutMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLogoutMenu]);

  const handleLogout = () => {
    setShowLogoutMenu(false);
    logout();
  };

  // Generate user initials from username
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside className="w-full h-full bg-white border-r border-slate-200 flex flex-col overflow-hidden">
      {/* Logo / App Name with Avatar */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center bg-gradient-to-br from-blue-600 to-teal-600 w-9 h-9 mt-1 mb-1 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-110">
            <Wrench className="w-8 h-8 text-white" />
          </div>
          <div className="font-semibold text-sm">MaintainPro</div>
        </div>

        {/* Avatar with Logout Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowLogoutMenu(!showLogoutMenu)}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-teal-600 text-white flex items-center justify-center text-xs font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="User menu"
          >
            {getInitials(user?.username)}
          </button>

          {/* Dropdown Menu */}
          {showLogoutMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-teal-600 text-white flex items-center justify-center text-sm font-semibold">
                    {getInitials(user?.username)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 truncate">
                      {user?.username || "User"}
                    </div>
                    <div className="text-xs text-slate-500 capitalize">
                      {user?.role || "Member"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <div className="p-4 flex-1 overflow-y-auto">
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
            <Gem className="w-5 h-5" />
            Assets
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