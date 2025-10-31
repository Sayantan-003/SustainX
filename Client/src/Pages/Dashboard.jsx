// //Dashboard.jsx:

// import { useState, useMemo } from "react";
// import { toast } from "react-hot-toast"; 
// import Sidebar from "../components/layout/Sidebar";
// import Header from "../components/layout/Header";
// import WorkOrderFilters from "../components/workOrders/WorkOrderFilters";
// import WorkOrdersTable from "../components/workOrders/WorkOrdersTable";
// import WorkOrderModal from "../components/workOrders/WorkOrderModal";
// import useWorkOrders from "../hooks/useWorkOrders";

// export default function Dashboard() {
//   const { workOrders, addWorkOrder } = useWorkOrders();
//   const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [priorityFilter, setPriorityFilter] = useState("All");
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showFilters, setShowFilters] = useState(true);
//   const [newWorkOrder, setNewWorkOrder] = useState({
//     title: "",
//     description: "",
//     priority: "Medium",
//     status: "Open",
//   });

//   // ---------------- Filtered Work Orders ----------------
//   // const filtered = useMemo(() => {
//   //   return workOrders
//   //     .filter((wo) => wo.title.toLowerCase().includes(query.toLowerCase()))
//   //     .filter((wo) =>
//   //       statusFilter === "All" ? true : wo.status === statusFilter
//   //     )
//   //     .filter((wo) =>
//   //       priorityFilter === "All" ? true : wo.priority === priorityFilter
//   //     )
//   //     .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
//   // }, [workOrders, query, statusFilter, priorityFilter]);


// // Temporary debug - remove after fixing
// console.log("Work Orders:", workOrders);
// console.log("Work Orders with missing titles:", 
//   workOrders.filter(wo => !wo?.title)
// );
// // Replace the filtered useMemo in Dashboard.jsx with this:

// const filtered = useMemo(() => {
//   return workOrders
//     .filter((wo) => {
//       // Defensive check: ensure wo.title exists and is a string
//       if (!wo || !wo.title || typeof wo.title !== 'string') {
//         return false;
//       }
//       return wo.title.toLowerCase().includes(query.toLowerCase());
//     })
//     .filter((wo) =>
//       statusFilter === "All" ? true : wo.status === statusFilter
//     )
//     .filter((wo) =>
//       priorityFilter === "All" ? true : wo.priority === priorityFilter
//     )
//     .sort((a, b) => {
//       // Defensive check for dates
//       const dateA = a.startDate ? new Date(a.startDate) : new Date(0);
//       const dateB = b.startDate ? new Date(b.startDate) : new Date(0);
//       return dateB - dateA;
//     });
// }, [workOrders, query, statusFilter, priorityFilter]);



//   // ---------------- Clear Filters ----------------
//   const clearFilters = () => {
//     setQuery("");
//     setStatusFilter("All");
//     setPriorityFilter("All");
//   };

//   // ---------------- Create Work Order ----------------
//   const createWorkOrder = (formData) => {
//     console.log("Dashboard received form data:", formData);
//     try {
//       const maxId = workOrders.length
//         ? Math.max(...workOrders.map((wo) => parseInt(wo.id, 10)))
//         : 0;

//       const nextId = (maxId + 1).toString().padStart(3, "0");

//       const wo = {
//         id: nextId,
//         title: formData.title,
//         description: formData.description,
//         priority: formData.priority,
//         status: "Open",
//         dueDate: formData.dueDate || new Date().toISOString(),
//         startDate: formData.startDate || new Date().toISOString(),
//         category: formData.category,
//         location: formData.location,
//         asset: formData.asset,
//         team: formData.team,
//         signatureRequired: formData.signatureRequired,
//       };

//       console.log("Constructed work order:", wo);
//       addWorkOrder(wo);
//       console.log("Work order added successfully");

//       // Success toast
//       toast.success("Work order created successfully!");

//       // Reset modal and form state
//       setShowCreateModal(false);
//       setNewWorkOrder({
//         title: "",
//         description: "",
//         priority: "Medium",
//         status: "Open",
//       });
//     } catch (err) {
//       console.error("Error creating work order:", err);
//       toast.error("Failed to create work order.");
//     }
//   };

//   // ---------------- JSX ----------------
//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 w-64 flex-shrink-0
//         ${sidebarIsOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <Sidebar />
//       </div>

//       {/* Overlay - only show on smaller screens */}
//       {sidebarIsOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-30 lg:hidden"
//           onClick={() => setSidebarIsOpen(false)}
//         ></div>
//       )}

//       {/* Main Content */}
//       <main
//         className={`flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto transition-all duration-300 ease-in-out min-w-0
//         ${sidebarIsOpen ? "lg:ml-64" : "ml-0"}`}
//       >
//         <Header
//           query={query}
//           setQuery={setQuery}
//           openModal={() => setShowCreateModal(true)}
//           toggleSidebar={() => setSidebarIsOpen(!sidebarIsOpen)}
//           sidebarIsOpen={sidebarIsOpen}
//         />

//         <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-4">
//           <WorkOrderFilters
//             showFilters={showFilters}
//             setShowFilters={setShowFilters}
//             statusFilter={statusFilter}
//             setStatusFilter={setStatusFilter}
//             priorityFilter={priorityFilter}
//             setPriorityFilter={setPriorityFilter}
//             query={query}
//             clearFilters={clearFilters}
//             resultCount={filtered.length}
//           />

//           <WorkOrdersTable filtered={filtered} />
//         </div>
//       </main>

//       {/* Work Order Creation Modal */}
//       <WorkOrderModal
//         show={showCreateModal}
//         close={() => setShowCreateModal(false)}
//         createWorkOrder={createWorkOrder}
//         sidebarIsOpen={sidebarIsOpen}
//       />
//     </div>
//   );
// }



// import { useState, useMemo } from "react";
// import { toast } from "react-hot-toast"; 
// import Sidebar from "../components/layout/Sidebar";
// import Header from "../components/layout/Header";
// import WorkOrderFilters from "../components/workOrders/WorkOrderFilters";
// import WorkOrdersTable from "../components/workOrders/WorkOrdersTable";
// import WorkOrderModal from "../components/workOrders/WorkOrderModal";
// import useWorkOrders from "../hooks/useWorkOrders";
// import { Loader2 } from "lucide-react";

// export default function Dashboard() {
//   const { workOrders, loading, error, addWorkOrder, fetchWorkOrders } = useWorkOrders();
//   const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [priorityFilter, setPriorityFilter] = useState("All");
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showFilters, setShowFilters] = useState(true);

//   // ---------------- Filtered Work Orders ----------------
//   const filtered = useMemo(() => {
//     return workOrders
//       .filter((wo) => {
//         if (!wo || !wo.title || typeof wo.title !== 'string') {
//           return false;
//         }
//         return wo.title.toLowerCase().includes(query.toLowerCase());
//       })
//       .filter((wo) =>
//         statusFilter === "All" ? true : wo.status === statusFilter
//       )
//       .filter((wo) =>
//         priorityFilter === "All" ? true : wo.priority === priorityFilter
//       )
//       .sort((a, b) => {
//         const dateA = a.startDate ? new Date(a.startDate) : new Date(0);
//         const dateB = b.startDate ? new Date(b.startDate) : new Date(0);
//         return dateB - dateA;
//       });
//   }, [workOrders, query, statusFilter, priorityFilter]);

//   // ---------------- Clear Filters ----------------
//   const clearFilters = () => {
//     setQuery("");
//     setStatusFilter("All");
//     setPriorityFilter("All");
//   };

//   // ---------------- Create Work Order ----------------
//   const createWorkOrder = async (formData) => {
//     console.log("Dashboard received form data:", formData);
//     try {
//       const wo = {
//         id: formData.id || Date.now().toString(),
//         title: formData.title,
//         description: formData.description,
//         priority: formData.priority,
//         status: "Open",
//         dueDate: formData.dueDate || new Date().toISOString(),
//         startDate: formData.startDate || new Date().toISOString(),
//         category: formData.category,
//         location: formData.location,
//         asset: formData.asset,
//         team: formData.team,
//         primaryAssignee: formData.primaryAssignee,
//         additionalAssignees: formData.additionalAssignees,
//         signatureRequired: formData.signatureRequired,
//         duration: formData.duration || 0,
//       };

//       console.log("Constructed work order:", wo);
//       await addWorkOrder(wo);
//       console.log("Work order added successfully");

//       toast.success("Work order created successfully!");

//       setShowCreateModal(false);
//     } catch (err) {
//       console.error("Error creating work order:", err);
//       toast.error("Failed to create work order.");
//     }
//   };

//   // ---------------- JSX ----------------
//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 w-64 flex-shrink-0
//         ${sidebarIsOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <Sidebar />
//       </div>

//       {/* Overlay */}
//       {sidebarIsOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-30 lg:hidden"
//           onClick={() => setSidebarIsOpen(false)}
//         ></div>
//       )}

//       {/* Main Content */}
//       <main
//         className={`flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto transition-all duration-300 ease-in-out min-w-0
//         ${sidebarIsOpen ? "lg:ml-64" : "ml-0"}`}
//       >
//         <Header
//           query={query}
//           setQuery={setQuery}
//           openModal={() => setShowCreateModal(true)}
//           toggleSidebar={() => setSidebarIsOpen(!sidebarIsOpen)}
//           sidebarIsOpen={sidebarIsOpen}
//         />

//         {/* Error Message */}
//         {error && (
//           <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-4 flex items-center gap-3">
//             <div className="text-red-600 font-medium">{error}</div>
//             <button
//               onClick={() => fetchWorkOrders()}
//               className="ml-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
//             >
//               Retry
//             </button>
//           </div>
//         )}

//         <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-4">
//           <WorkOrderFilters
//             showFilters={showFilters}
//             setShowFilters={setShowFilters}
//             statusFilter={statusFilter}
//             setStatusFilter={setStatusFilter}
//             priorityFilter={priorityFilter}
//             setPriorityFilter={setPriorityFilter}
//             query={query}
//             clearFilters={clearFilters}
//             resultCount={filtered.length}
//           />

//           {/* Loading State */}
//           {loading ? (
//             <div className="flex items-center justify-center py-16">
//               <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
//               <span className="ml-3 text-slate-600">Loading work orders...</span>
//             </div>
//           ) : (
//             <WorkOrdersTable filtered={filtered} />
//           )}
//         </div>
//       </main>

//       {/* Work Order Creation Modal */}
//       <WorkOrderModal
//         show={showCreateModal}
//         close={() => setShowCreateModal(false)}
//         createWorkOrder={createWorkOrder}
//         sidebarIsOpen={sidebarIsOpen}
//       />
//     </div>
//   );
// }



// //Dashboard.jsx:
// import { useState, useMemo } from "react";
// import { toast } from "react-hot-toast"; 
// import Sidebar from "../components/layout/Sidebar";
// import Header from "../components/layout/Header";
// import WorkOrderFilters from "../components/workOrders/WorkOrderFilters";
// import WorkOrdersTable from "../components/workOrders/WorkOrdersTable";
// import WorkOrderModal from "../components/workOrders/WorkOrderModal";
// import useWorkOrders from "../hooks/useWorkOrders";
// import { Loader2 } from "lucide-react";

// export default function Dashboard() {
//   const { workOrders, loading, error, addWorkOrder, fetchWorkOrders } = useWorkOrders();
//   const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [priorityFilter, setPriorityFilter] = useState("All");
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showFilters, setShowFilters] = useState(true);

//   // ---------------- Filtered Work Orders ----------------
//   const filtered = useMemo(() => {
//     return workOrders
//       .filter((wo) => {
//         if (!wo || !wo.title || typeof wo.title !== 'string') {
//           return false;
//         }
//         return wo.title.toLowerCase().includes(query.toLowerCase());
//       })
//       .filter((wo) =>
//         statusFilter === "All" ? true : wo.status === statusFilter
//       )
//       .filter((wo) =>
//         priorityFilter === "All" ? true : wo.priority === priorityFilter
//       )
//       .sort((a, b) => {
//         const dateA = a.startDate ? new Date(a.startDate) : new Date(0);
//         const dateB = b.startDate ? new Date(b.startDate) : new Date(0);
//         return dateB - dateA;
//       });
//   }, [workOrders, query, statusFilter, priorityFilter]);

//   // ---------------- Clear Filters ----------------
//   const clearFilters = () => {
//     setQuery("");
//     setStatusFilter("All");
//     setPriorityFilter("All");
//   };

//   // ---------------- Create Work Order ----------------
//   const createWorkOrder = async (formData) => {
//     console.log("Dashboard received form data:", formData);
//     try {
//       const wo = {
//         id: formData.id || Date.now().toString(),
//         title: formData.title,
//         description: formData.description,
//         priority: formData.priority,
//         status: "Open",
//         dueDate: formData.dueDate || new Date().toISOString(),
//         startDate: formData.startDate || new Date().toISOString(),
//         category: formData.category,
//         location: formData.location,
//         asset: formData.asset,
//         team: formData.team,
//         primaryAssignee: formData.primaryAssignee,
//         additionalAssignees: formData.additionalAssignees,
//         signatureRequired: formData.signatureRequired,
//         duration: formData.duration || 0,
//       };

//       console.log("Constructed work order:", wo);
//       await addWorkOrder(wo);
//       console.log("Work order added successfully");

//       toast.success("Work order created successfully!");

//       setShowCreateModal(false);
//     } catch (err) {
//       console.error("Error creating work order:", err);
//       toast.error("Failed to create work order.");
//     }
//   };

//   // ---------------- JSX ----------------
//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 w-64 flex-shrink-0
//         ${sidebarIsOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <Sidebar />
//       </div>

//       {/* Overlay */}
//       {sidebarIsOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-30 lg:hidden"
//           onClick={() => setSidebarIsOpen(false)}
//         ></div>
//       )}

//       {/* Main Content */}
//       <main
//         className={`flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto transition-all duration-300 ease-in-out min-w-0
//         ${sidebarIsOpen ? "lg:ml-64" : "ml-0"}`}
//       >
//         <Header
//           query={query}
//           setQuery={setQuery}
//           openModal={() => setShowCreateModal(true)}
//           toggleSidebar={() => setSidebarIsOpen(!sidebarIsOpen)}
//           sidebarIsOpen={sidebarIsOpen}
//         />

//         {/* Error Message */}
//         {error && (
//           <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-4 flex items-center gap-3">
//             <div className="text-red-600 font-medium">{error}</div>
//             <button
//               onClick={() => fetchWorkOrders()}
//               className="ml-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
//             >
//               Retry
//             </button>
//           </div>
//         )}

//         <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-4">
//           <WorkOrderFilters
//             showFilters={showFilters}
//             setShowFilters={setShowFilters}
//             statusFilter={statusFilter}
//             setStatusFilter={setStatusFilter}
//             priorityFilter={priorityFilter}
//             setPriorityFilter={setPriorityFilter}
//             query={query}
//             clearFilters={clearFilters}
//             resultCount={filtered.length}
//           />

//           {/* Loading State */}
//           {loading ? (
//             <div className="flex items-center justify-center py-16">
//               <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
//               <span className="ml-3 text-slate-600">Loading work orders...</span>
//             </div>
//           ) : (
//             <WorkOrdersTable filtered={filtered} />
//           )}
//         </div>
//       </main>

//       {/* Work Order Creation Modal */}
//       <WorkOrderModal
//         show={showCreateModal}
//         close={() => setShowCreateModal(false)}
//         createWorkOrder={createWorkOrder}
//         sidebarIsOpen={sidebarIsOpen}
//       />
//     </div>
//   );
// }



//Dashboard.jsx:
import { useState, useMemo } from "react";
import { toast } from "react-hot-toast"; 
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import WorkOrderFilters from "../components/workOrders/WorkOrderFilters";
import WorkOrdersTable from "../components/workOrders/WorkOrdersTable";
import WorkOrderModal from "../components/workOrders/WorkOrderModal";
import WorkOrderDetailedModal from "../components/workOrders/WorkOrderDetailedModal";
import useWorkOrders from "../hooks/useWorkOrders";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { workOrders, loading, error, fetchWorkOrders, deleteWorkOrder } = useWorkOrders();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);

  // ---------------- Filtered Work Orders ----------------
  const filtered = useMemo(() => {
    return workOrders
      .filter((wo) => {
        if (!wo || !wo.title || typeof wo.title !== 'string') {
          return false;
        }
        return wo.title.toLowerCase().includes(query.toLowerCase());
      })
      .filter((wo) =>
        statusFilter === "All" ? true : wo.status === statusFilter
      )
      .filter((wo) =>
        priorityFilter === "All" ? true : wo.priority === priorityFilter
      )
      .sort((a, b) => {
        const dateA = a.startDate ? new Date(a.startDate) : new Date(0);
        const dateB = b.startDate ? new Date(b.startDate) : new Date(0);
        return dateB - dateA;
      });
  }, [workOrders, query, statusFilter, priorityFilter]);

  // ---------------- Clear Filters ----------------
  const clearFilters = () => {
    setQuery("");
    setStatusFilter("All");
    setPriorityFilter("All");
  };

  // ---------------- Handle Work Order Creation Success ----------------
  const handleWorkOrderCreated = async () => {
    // Refetch work orders to get the new one from server
    await fetchWorkOrders();
    setShowCreateModal(false);
  };

  // ---------------- Handle Work Order Update ----------------
  const handleUpdateWorkOrder = async (updatedWO) => {
    try {
      // TODO: Add API call to update work order
      // await updateWorkOrder(updatedWO.id, updatedWO);
      
      toast.success("Work order updated successfully!");
      setSelectedWorkOrder(null);
      await fetchWorkOrders();
    } catch (err) {
      console.error("Error updating work order:", err);
      toast.error("Failed to update work order.");
    }
  };

  // ---------------- Handle Work Order Deletion ----------------
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

  // ---------------- JSX ----------------
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 w-64 flex-shrink-0
        ${sidebarIsOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
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
        className={`flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto transition-all duration-300 ease-in-out min-w-0
        ${sidebarIsOpen ? "lg:ml-64" : "ml-0"}`}
      >
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
      </main>

      {/* Work Order Creation Modal */}
      <WorkOrderModal
        show={showCreateModal}
        close={() => setShowCreateModal(false)}
        createWorkOrder={handleWorkOrderCreated}
        sidebarIsOpen={sidebarIsOpen}
      />

      {/* Work Order Detail Modal */}
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