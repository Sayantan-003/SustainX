import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast"; 
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import WorkOrderFilters from "../components/workOrders/WorkOrderFilters";
import WorkOrdersTable from "../components/workOrders/WorkOrdersTable";
import WorkOrderModal from "../components/workOrders/WorkOrderModal";
import WorkOrderDetailedModal from "../components/workOrders/WorkOrderDetailedModal";
import useWorkOrders from "../hooks/useWorkOrders";
import { Loader2 } from "lucide-react";

export default function WorkOrderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { workOrders, loading, error, fetchWorkOrders, deleteWorkOrder } = useWorkOrders();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [dueDateFilter, setDueDateFilter] = useState([]);
  const [userFilter, setUserFilter] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);

  // Determine active section from URL
  const getActiveSection = () => {
    if (location.pathname === '/checklists') return 'checklists';
    if (location.pathname === '/') return 'work-orders';
    return 'work-orders'; 
  };

  // Handle navigation
  const handleNavigation = (section) => {
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setSidebarIsOpen(false);
    }

    // Navigate to different routes based on section
    if (section === "checklists") {
      navigate("/checklists");
    } else if (section === "work-orders") {
      navigate("/");
    }
    // Add more navigation cases as needed
  };

  // Helper: Check if date matches due date filter
  const matchesDueDateFilter = (dueDate, filters) => {
    if (!filters || filters.length === 0) return true;
    if (!dueDate) return false;

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return filters.some(filter => {
      switch (filter) {
        case "Today":
          return due.getTime() === today.getTime();
        
        case "This Week": {
          const weekEnd = new Date(today);
          weekEnd.setDate(today.getDate() + (7 - today.getDay()));
          return due >= today && due <= weekEnd;
        }
        
        case "This Month": {
          return due.getMonth() === today.getMonth() && 
                 due.getFullYear() === today.getFullYear();
        }
        
        case "Overdue":
          return due < today;
        
        case "Next 7 Days": {
          const next7 = new Date(today);
          next7.setDate(today.getDate() + 7);
          return due >= today && due <= next7;
        }
        
        case "Next 30 Days": {
          const next30 = new Date(today);
          next30.setDate(today.getDate() + 30);
          return due >= today && due <= next30;
        }
        
        default:
          return true;
      }
    });
  };

  // Filtered Work Orders
  const filtered = useMemo(() => {
    return workOrders
      .filter((wo) => {
        if (!wo || !wo.title || typeof wo.title !== 'string') {
          return false;
        }
        
        const searchLower = query.toLowerCase().trim();
        if (searchLower) {
          const titleMatch = wo.title.toLowerCase().includes(searchLower);
          if (!titleMatch) {
            return false;
          }
        }

        if (statusFilter.length > 0 && !statusFilter.includes(wo.status)) {
          return false;
        }

        if (priorityFilter.length > 0 && !priorityFilter.includes(wo.priority)) {
          return false;
        }

        if (locationFilter.length > 0 && !locationFilter.includes(wo.location)) {
          return false;
        }

        if (dueDateFilter.length > 0 && !matchesDueDateFilter(wo.due || wo.dueDate, dueDateFilter)) {
          return false;
        }

        if (userFilter.length > 0) {
          const assignee = wo.primaryAssignee || wo.assignee || "";
          if (!userFilter.includes(assignee)) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        const dateA = a.startDate ? new Date(a.startDate) : new Date(0);
        const dateB = b.startDate ? new Date(b.startDate) : new Date(0);
        return dateB - dateA;
      });
  }, [workOrders, query, statusFilter, priorityFilter, locationFilter, dueDateFilter, userFilter]);

  // Clear Filters
  const clearFilters = () => {
    setQuery("");
    setStatusFilter([]);
    setPriorityFilter([]);
    setLocationFilter([]);
    setDueDateFilter([]);
    setUserFilter([]);
  };

  // Handle Work Order Creation Success
  const handleWorkOrderCreated = async () => {
    await fetchWorkOrders();
    setShowCreateModal(false);
  };

  // Handle Work Order Update
  const handleUpdateWorkOrder = async (updatedWO) => {
    try {
      toast.success("Work order updated successfully!");
      setSelectedWorkOrder(null);
      await fetchWorkOrders();
    } catch (err) {
      console.error("Error updating work order:", err);
      toast.error("Failed to update work order.");
    }
  };

  // Handle Work Order Deletion
  const handleDeleteWorkOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this work order?")) {
      try {
        await deleteWorkOrder(id);
        toast.success("Work order deleted successfully!");
        setSelectedWorkOrder(null);
        await fetchWorkOrders();
      } catch (err) {
        console.error("Error deleting work order:", err);
        toast.error("Failed to delete work order.");
      }
    }
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
          <Header
            query={query}
            setQuery={setQuery}
            openModal={() => setShowCreateModal(true)}
            toggleSidebar={() => setSidebarIsOpen(!sidebarIsOpen)}
            sidebarIsOpen={sidebarIsOpen}
          />

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-4 flex items-center gap-3">
              <div className="text-red-600 font-medium">{error}</div>
              <button
                onClick={() => fetchWorkOrders()}
                className="ml-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Retry
              </button>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-4">
            <WorkOrderFilters
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              locationFilter={locationFilter}
              setLocationFilter={setLocationFilter}
              dueDateFilter={dueDateFilter}
              setDueDateFilter={setDueDateFilter}
              userFilter={userFilter}
              setUserFilter={setUserFilter}
              query={query}
              clearFilters={clearFilters}
              resultCount={filtered.length}
            />

            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <span className="ml-3 text-slate-600">Loading work orders...</span>
              </div>
            ) : (
              <WorkOrdersTable 
                filtered={filtered} 
                onRowClick={setSelectedWorkOrder}
              />
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <WorkOrderModal
        show={showCreateModal}
        close={() => setShowCreateModal(false)}
        createWorkOrder={handleWorkOrderCreated}
        sidebarIsOpen={sidebarIsOpen}
      />

      {selectedWorkOrder && (
        <WorkOrderDetailedModal
          workOrder={selectedWorkOrder}
          onClose={() => setSelectedWorkOrder(null)}
          onUpdate={handleUpdateWorkOrder}
          onDelete={handleDeleteWorkOrder}
        />
      )}
    </div>
  );
}