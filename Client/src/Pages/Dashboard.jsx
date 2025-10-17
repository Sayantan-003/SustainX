// import { useState, useMemo } from "react";
// import Sidebar from "../components/layout/Sidebar";
// import Header from "../components/layout/Header";
// import WorkOrderFilters from "../components/workOrders/WorkOrderFilters";
// import WorkOrdersTable from "../components/workOrders/WorkOrdersTable";
// import WorkOrderModal from "../components/workOrders/WorkOrderModal";
// import useWorkOrders from "../hooks/useWorkOrders";

// export default function Dashboard() {
//   const { workOrders, addWorkOrder } = useWorkOrders();
//   const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
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

//   const filtered = useMemo(() => {
//     return workOrders
//       .filter((wo) => wo.title.toLowerCase().includes(query.toLowerCase()))
//       .filter((wo) =>
//         statusFilter === "All" ? true : wo.status === statusFilter
//       )
//       .filter((wo) =>
//         priorityFilter === "All" ? true : wo.priority === priorityFilter
//       )
//       .sort((a, b) => new Date(b.start) - new Date(a.start));
//   }, [workOrders, query, statusFilter, priorityFilter]);

//   const clearFilters = () => {
//     setQuery("");
//     setStatusFilter("All");
//     setPriorityFilter("All");
//   };

//   const createWorkOrder = () => {
//     const nextId = (
//       Math.max(...workOrders.map((wo) => parseInt(wo.id, 10)), 0) + 1
//     )
//       .toString()
//       .padStart(3, "0");

//     const wo = {
//       id: nextId,
//       ...newWorkOrder,
//       due: new Date().toISOString(),
//       start: new Date().toISOString(),
//     };

//     addWorkOrder(wo);
//     setNewWorkOrder({
//       title: "",
//       description: "",
//       priority: "Medium",
//       status: "Open",
//     });
//     setShowCreateModal(false);
//   };

//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       {/* Sidebar*/}
//       <div
//         className={`fixed top-0 left-0 h-full transform transition-transform duration-300 ease-in-out ${
//           sidebarIsOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
//         }`}
//       >
//         <Sidebar />
//       </div>
//       <main className={`flex-1 p-8 overflow-y-auto transition-all duration-300 ease-in-out ${
//         sidebarIsOpen ? 'ml-64' : 'ml-0'
//       }`}>
//         <Header
//           query={query}
//           setQuery={setQuery}
//           openModal={() => setShowCreateModal(true)}
//           toggleSidebar={() => setSidebarIsOpen(!sidebarIsOpen)}
//           sidebarIsOpen={sidebarIsOpen}  // THIS WAS MISSING!
//         />

//         <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
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

//       <WorkOrderModal
//         show={showCreateModal}
//         close={() => setShowCreateModal(false)}
//         newWorkOrder={newWorkOrder}
//         setNewWorkOrder={setNewWorkOrder}
//         createWorkOrder={createWorkOrder}
//       />
//     </div>
//   );
// }

// //Dasboard.jsx
// import { useState, useMemo } from "react";
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

//   const filtered = useMemo(() => {
//     return workOrders
//       .filter((wo) => wo.title.toLowerCase().includes(query.toLowerCase()))
//       .filter((wo) =>
//         statusFilter === "All" ? true : wo.status === statusFilter
//       )
//       .filter((wo) =>
//         priorityFilter === "All" ? true : wo.priority === priorityFilter
//       )
//       .sort((a, b) => new Date(b.start) - new Date(a.start));
//   }, [workOrders, query, statusFilter, priorityFilter]);

//   const clearFilters = () => {
//     setQuery("");
//     setStatusFilter("All");
//     setPriorityFilter("All");
//   };

//   const createWorkOrder = () => {
//     const nextId = (
//       Math.max(...workOrders.map((wo) => parseInt(wo.id, 10)), 0) + 1
//     )
//       .toString()
//       .padStart(3, "0");

//     const wo = {
//       id: nextId,
//       ...newWorkOrder,
//       due: new Date().toISOString(),
//       start: new Date().toISOString(),
//     };

//     addWorkOrder(wo);
//     setNewWorkOrder({
//       title: "",
//       description: "",
//       priority: "Medium",
//       status: "Open",
//     });
//     setShowCreateModal(false);
//   };

//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       {/* Sidebar */}
//        <div
//         className={`fixed top-0 left-0 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 w-64 flex-shrink-0
//         ${sidebarIsOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <Sidebar />
//       </div>
//       {/* Overlay for mobile */}
//       {sidebarIsOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-30 md:hidden"
//           onClick={() => setSidebarIsOpen(false)}
//         ></div>
//       )}

//       {/* Main Content */}
//       <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto transition-all duration-300 ease-in-out min-w-0">
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

//       <WorkOrderModal
//         show={showCreateModal}
//         close={() => setShowCreateModal(false)}
//         newWorkOrder={newWorkOrder}
//         setNewWorkOrder={setNewWorkOrder}
//         createWorkOrder={createWorkOrder}
//       />
//     </div>
//   );
// }



// import { useState, useMemo } from "react";
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

//   const filtered = useMemo(() => {
//     return workOrders
//       .filter((wo) => wo.title.toLowerCase().includes(query.toLowerCase()))
//       .filter((wo) =>
//         statusFilter === "All" ? true : wo.status === statusFilter
//       )
//       .filter((wo) =>
//         priorityFilter === "All" ? true : wo.priority === priorityFilter
//       )
//       .sort((a, b) => new Date(b.start) - new Date(a.start));
//   }, [workOrders, query, statusFilter, priorityFilter]);

//   const clearFilters = () => {
//     setQuery("");
//     setStatusFilter("All");
//     setPriorityFilter("All");
//   };

// const createWorkOrder = (formData) => {
//   console.log('Dashboard received form data:', formData);
//   try {
//     const maxId = workOrders.length
//       ? Math.max(...workOrders.map((wo) => parseInt(wo.id, 10)))
//       : 0;

//     const nextId = (maxId + 1).toString().padStart(3, "0");

//     const wo = {
//       id: nextId,
//       title: formData.title,
//       description: formData.description,
//       priority: formData.priority,
//       status: "Open",
//       dueDate: formData.dueDate || new Date().toISOString(),
//       startDate: formData.startDate || new Date().toISOString(),
//       category: formData.category,
//       location: formData.location,
//       asset: formData.asset,
//       team: formData.team,
//       signatureRequired: formData.signatureRequired,
//     };

//     console.log('Constructed work order:', wo);
//     addWorkOrder(wo);
//     console.log('Work order added successfully');

//     setShowCreateModal(false);
//     setNewWorkOrder({
//       title: "",
//       description: "",
//       priority: "Medium",
//       status: "Open",
//     });
//   } catch (err) {
//     console.error("Error creating work order:", err);
//   }
// };



import { useState, useMemo } from "react";
import { toast } from "react-hot-toast"; 
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import WorkOrderFilters from "../components/workOrders/WorkOrderFilters";
import WorkOrdersTable from "../components/workOrders/WorkOrdersTable";
import WorkOrderModal from "../components/workOrders/WorkOrderModal";
import useWorkOrders from "../hooks/useWorkOrders";

export default function Dashboard() {
  const { workOrders, addWorkOrder } = useWorkOrders();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
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

  // ---------------- Filtered Work Orders ----------------
  const filtered = useMemo(() => {
    return workOrders
      .filter((wo) => wo.title.toLowerCase().includes(query.toLowerCase()))
      .filter((wo) =>
        statusFilter === "All" ? true : wo.status === statusFilter
      )
      .filter((wo) =>
        priorityFilter === "All" ? true : wo.priority === priorityFilter
      )
      .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  }, [workOrders, query, statusFilter, priorityFilter]);

  // ---------------- Clear Filters ----------------
  const clearFilters = () => {
    setQuery("");
    setStatusFilter("All");
    setPriorityFilter("All");
  };

  // ---------------- Create Work Order ----------------
  const createWorkOrder = (formData) => {
    console.log("Dashboard received form data:", formData);
    try {
      const maxId = workOrders.length
        ? Math.max(...workOrders.map((wo) => parseInt(wo.id, 10)))
        : 0;

      const nextId = (maxId + 1).toString().padStart(3, "0");

      const wo = {
        id: nextId,
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        status: "Open",
        dueDate: formData.dueDate || new Date().toISOString(),
        startDate: formData.startDate || new Date().toISOString(),
        category: formData.category,
        location: formData.location,
        asset: formData.asset,
        team: formData.team,
        signatureRequired: formData.signatureRequired,
      };

      console.log("Constructed work order:", wo);
      addWorkOrder(wo);
      console.log("Work order added successfully");

      // ✅ Success toast
      toast.success("✅ Work order created successfully!");

      // Reset modal and form state
      setShowCreateModal(false);
      setNewWorkOrder({
        title: "",
        description: "",
        priority: "Medium",
        status: "Open",
      });
    } catch (err) {
      console.error("Error creating work order:", err);
      toast.error("❌ Failed to create work order.");
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

      {/* Overlay - only show on smaller screens */}
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

          <WorkOrdersTable filtered={filtered} />
        </div>
      </main>

      {/* Work Order Creation Modal */}
      <WorkOrderModal
        show={showCreateModal}
        close={() => setShowCreateModal(false)}
        createWorkOrder={createWorkOrder}
        sidebarIsOpen={sidebarIsOpen}
      />
    </div>
  );
}
