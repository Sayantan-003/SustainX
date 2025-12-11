import { ReactSVG } from "react-svg";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, MoreVertical, SlidersHorizontal } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import { getAllChecklists } from "../../api/Checklist";

import CloseIcon from "../../assets/left_panel_close_icon.svg";
import OpenIcon from "../../assets/left_panel_open_icon.svg";

export default function ChecklistPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("your-checklists");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showTagsMenu, setShowTagsMenu] = useState(false);

  // State for API data
  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  // Fetch checklists from API
  useEffect(() => {
    fetchChecklists();
  }, [activeTab, searchQuery, pagination.currentPage]);

  const fetchChecklists = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: pagination.currentPage,
        limit: 10,
        isTemplate: activeTab === "template-library" ? "true" : "false",
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      const response = await getAllChecklists(params);

      if (response.ok) {
        setChecklists(response.data || []);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      } else {
        setError(response.message || "Failed to fetch checklists");
      }
    } catch (err) {
      console.error("Error fetching checklists:", err);
      setError("An error occurred while fetching checklists");
    } finally {
      setLoading(false);
    }
  };

  // Determine active section from URL
  const getActiveSection = () => {
    if (location.pathname === "/checklists") return "checklists";
    if (location.pathname === "/") return "work-orders";
    return "work-orders";
  };

  // Handle navigation
  const handleNavigation = (section) => {
    if (window.innerWidth < 1024) {
      setSidebarIsOpen(false);
    }

    if (section === "checklists") {
      navigate("/checklists");
    } else if (section === "work-orders") {
      navigate("/");
    }
  };

  // Handle search with debounce
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Handle checklist click
  const handleChecklistClick = (checklistId) => {
    navigate(`/checklists/${checklistId}`);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 w-64 flex-shrink-0
        ${sidebarIsOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar
          activeSection={getActiveSection()}
          onNavigate={handleNavigation}
        />
      </div>

      {/* Overlay */}
      {sidebarIsOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarIsOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out min-w-0
        ${sidebarIsOpen ? "lg:ml-64" : "ml-0"}`}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header with Sidebar Toggle */}
          <div className="mb-6 border-b border-slate-200 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                  className="p-2 rounded-md hover:bg-slate-100 border border-slate-200 transition"
                  aria-label={sidebarIsOpen ? "Close sidebar" : "Open sidebar"}
                  title={sidebarIsOpen ? "Close sidebar" : "Open sidebar"}
                >
                  {sidebarIsOpen ? (
                    <ReactSVG
                      src={CloseIcon}
                      beforeInjection={(svg) => {
                        svg.classList.add("w-7", "h-7", "text-slate-700");
                      }}
                    />
                  ) : (
                    <ReactSVG
                      src={OpenIcon}
                      beforeInjection={(svg) => {
                        svg.classList.add("w-7", "h-7", "text-slate-700");
                      }}
                    />
                  )}
                </button>
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800">
                  Checklists
                </h1>
              </div>

              {/* Add Checklist Button - Desktop */}
              <button 
                onClick={() => navigate("/checklists/new")}
                className="hidden sm:block px-4 py-2 bg-blue-600 text-white rounded-xl border border-blue-600 hover:bg-blue-700 hover:border-blue-700 transition"
              >
                + Add Checklist
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-slate-200">
            <div className="flex gap-8">
              <button
                onClick={() => {
                  setActiveTab("your-checklists");
                  setPagination(prev => ({ ...prev, currentPage: 1 }));
                }}
                className={`pb-3 font-medium text-sm transition-colors relative ${
                  activeTab === "your-checklists"
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Your Checklists
                {activeTab === "your-checklists" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
              <button
                onClick={() => {
                  setActiveTab("template-library");
                  setPagination(prev => ({ ...prev, currentPage: 1 }));
                }}
                className={`pb-3 font-medium text-sm transition-colors relative ${
                  activeTab === "template-library"
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Template Library
                {activeTab === "template-library" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            </div>
          </div>

          {/* Header with Count and Actions */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="text-slate-600">
              <span className="font-medium">{pagination.totalItems}</span> Checklist
              {pagination.totalItems !== 1 ? "s" : ""}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by Name"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 sm:w-64"
                />
              </div>

              {/* More Options */}
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-slate-600" />
              </button>

              {/* Add Checklist Button - Mobile */}
              <button 
                onClick={() => navigate("/checklists/new")}
                className="sm:hidden px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
              >
                Add Checklist
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            <div className="relative">
              <button
                onClick={() => setShowTagsMenu(!showTagsMenu)}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span className="text-slate-600">#</span>
                Tags
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            <button 
              onClick={() => {
                setSearchQuery("");
                setPagination(prev => ({ ...prev, currentPage: 1 }));
              }}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Reset
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-slate-600">Loading checklists...</p>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                {/* Table Header - Hidden on mobile */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-700">
                  <div className="col-span-1">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-4">Name</div>
                  <div className="col-span-3">Section</div>
                  <div className="col-span-2">Tasks</div>
                  <div className="col-span-2">Status</div>
                </div>

                {/* Table Rows */}
                {checklists.length > 0 ? (
                  checklists.map((checklist) => (
                    <div
                      key={checklist._id}
                      onClick={() => handleChecklistClick(checklist._id)}
                      className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="hidden md:flex md:col-span-1 items-center">
                        <input
                          type="checkbox"
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-4 flex items-center">
                        <span className="text-sm font-medium text-slate-900">
                          {checklist.name}
                        </span>
                      </div>
                      <div className="md:col-span-3 flex items-center">
                        <span className="text-sm text-slate-600 truncate">
                          {checklist.section || "No section"}
                        </span>
                      </div>
                      <div className="md:col-span-2 flex items-center">
                        <span className="text-xs md:text-sm text-slate-600">
                          <span className="md:hidden font-medium">Tasks: </span>
                          {checklist.tasks?.length || 0}
                        </span>
                      </div>
                      <div className="md:col-span-2 flex items-center justify-between">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          checklist.status === 'completed' ? 'bg-green-100 text-green-700' :
                          checklist.status === 'archived' ? 'bg-gray-100 text-gray-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {checklist.status}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add menu logic here
                          }}
                          className="p-1 hover:bg-slate-100 rounded transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-12 text-center text-slate-500">
                    <p>No checklists found</p>
                    <button 
                      onClick={() => navigate("/checklists/new")}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Create your first checklist
                    </button>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{" "}
                    {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{" "}
                    {pagination.totalItems} results
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                      disabled={pagination.currentPage === 1}
                      className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}