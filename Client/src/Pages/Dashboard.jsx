import { useState, useMemo } from "react";
import Sidebar from "../components/layout/sidebar";
import Header from "../components/layout/Header";
import WorkOrderFilters from "../components/workOrders/WorkOrderFilters";
import WorkOrdersTable from "../components/workOrders/workOrdersTable";
import WorkOrderModal from "../components/workOrders/WorkOrderModal";
import useWorkOrders from "../hooks/useWorkOrders";

export default function Dashboard() {
  const { workOrders, addWorkOrder } = useWorkOrders();
    const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [newWorkOrder, setNewWorkOrder] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
  });

  const filtered = useMemo(() => {
    return workOrders
      .filter((wo) =>
        wo.title.toLowerCase().includes(query.toLowerCase())
      )
      .filter((wo) =>
        statusFilter === "All" ? true : wo.status === statusFilter
      )
      .filter((wo) =>
        priorityFilter === "All" ? true : wo.priority === priorityFilter
      )
      .sort((a, b) => new Date(b.start) - new Date(a.start));
  }, [workOrders, query, statusFilter, priorityFilter]);

  const clearFilters = () => {
    setQuery("");
    setStatusFilter("All");
    setPriorityFilter("All");
  };

  const createWorkOrder = () => {
    const nextId = (
      Math.max(...workOrders.map((wo) => parseInt(wo.id, 10)), 0) + 1
    )
      .toString()
      .padStart(3, "0");

    const wo = {
      id: nextId,
      ...newWorkOrder,
      due: new Date().toISOString(),
      start: new Date().toISOString(),
    };

    addWorkOrder(wo);
    setNewWorkOrder({
      title: "",
      description: "",
      priority: "Medium",
      status: "Open",
    });
    setShowCreateModal(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <Header query={query} setQuery={setQuery} openModal={() => setShowCreateModal(true)} />

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <WorkOrderFilters
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            query={query}
            clearFilters={clearFilters}
            resultCount={filtered.length}
          />

          <WorkOrdersTable filtered={filtered} />
        </div>
      </main>

      <WorkOrderModal
        show={showCreateModal}
        close={() => setShowCreateModal(false)}
        newWorkOrder={newWorkOrder}
        setNewWorkOrder={setNewWorkOrder}
        createWorkOrder={createWorkOrder}
      />
    </div>
  );
}
