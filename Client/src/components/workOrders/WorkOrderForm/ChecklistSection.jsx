// //components/workOrders/WorkOrderForm/ChecklistSection

// import React from "react";
// import { Plus, CheckCircle2, ChevronDown, GripVertical, Briefcase, User, Trash2, ListChecks } from "lucide-react";


// // ChecklistSection Component
// function ChecklistSection({ checklists, setChecklists }) {
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Completed":
//         return "bg-emerald-100 text-emerald-800 border-emerald-300";
//       case "In Progress":
//         return "bg-blue-100 text-blue-800 border-blue-300";
//       default:
//         return "bg-slate-100 text-slate-700 border-slate-300";
//     }
//   };

//   const addChecklist = () => {
//     setChecklists([
//       ...checklists,
//       { id: Date.now(), name: "New Checklist", isExpanded: true, tasks: [] },
//     ]);
//   };

//   const removeChecklist = (checklistId) => {
//     setChecklists(checklists.filter((c) => c.id !== checklistId));
//   };

//   const toggleChecklist = (checklistId) => {
//     setChecklists(
//       checklists.map((c) =>
//         c.id === checklistId ? { ...c, isExpanded: !c.isExpanded } : c
//       )
//     );
//   };

//   const updateChecklistName = (checklistId, name) => {
//     setChecklists(
//       checklists.map((c) => (c.id === checklistId ? { ...c, name } : c))
//     );
//   };

//   const addTask = (checklistId) => {
//     setChecklists((prev) =>
//       prev.map((list) =>
//         list.id === checklistId
//           ? {
//               ...list,
//               tasks: [
//                 ...list.tasks,
//                 { id: Date.now(), name: "", status: "Not Started" },
//               ],
//             }
//           : list
//       )
//     );
//   };

//   const updateTask = (checklistId, taskId, field, value) => {
//     setChecklists((prev) =>
//       prev.map((list) =>
//         list.id === checklistId
//           ? {
//               ...list,
//               tasks: list.tasks.map((task) =>
//                 task.id === taskId ? { ...task, [field]: value } : task
//               ),
//             }
//           : list
//       )
//     );
//   };

//   const removeTask = (checklistId, taskId) => {
//     setChecklists((prev) =>
//       prev.map((list) =>
//         list.id === checklistId
//           ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
//           : list
//       )
//     );
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8">
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
//             <CheckCircle2 className="w-5 h-5 text-white" />
//           </div>
//           <h2 className="text-lg sm:text-xl font-bold text-slate-900">
//             Tasks & Checklists
//           </h2>
//         </div>
//         <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
//           <button
//             type="button"
//             onClick={() => addTask(checklists[0]?.id)}
//             className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
//           >
//             <Plus className="w-4 h-4" />
//             <span>Add Task</span>
//           </button>
//           <button
//             type="button"
//             onClick={addChecklist}
//             className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
//           >
//             <Plus className="w-4 h-4" />
//             <span>Add List</span>
//           </button>
//         </div>
//       </div>

//       <div className="space-y-3 sm:space-y-4">
//         {checklists.map((checklist) => (
//           <div
//             key={checklist.id}
//             className="border-2 border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors"
//           >
//             <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-3 sm:p-4 flex items-center justify-between gap-2">
//               <div className="flex items-center gap-2 flex-1 min-w-0">
//                 <ListChecks className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 flex-shrink-0" />
//                 <input
//                   type="text"
//                   value={checklist.name}
//                   onChange={(e) =>
//                     updateChecklistName(checklist.id, e.target.value)
//                   }
//                   className="text-sm sm:text-base font-bold text-slate-800 bg-transparent border-none focus:outline-none flex-1 placeholder:text-slate-400 min-w-0"
//                   placeholder="Checklist Name"
//                 />
//               </div>
//               <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
//                 <span className="text-xs sm:text-sm font-medium text-slate-600 bg-white px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
//                   {checklist.tasks.length}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={() => removeChecklist(checklist.id)}
//                   className="text-red-600 hover:text-red-700 p-1.5 sm:p-2 hover:bg-red-50 rounded-lg transition-colors"
//                   aria-label="Remove checklist"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => toggleChecklist(checklist.id)}
//                   className="text-slate-600 hover:text-slate-800 p-1.5 sm:p-2 hover:bg-white rounded-lg transition-colors"
//                   aria-label="Toggle checklist"
//                 >
//                   <ChevronDown
//                     className={`w-5 h-5 transition-transform ${
//                       checklist.isExpanded ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>
//               </div>
//             </div>

//             {checklist.isExpanded && (
//               <div className="p-3 sm:p-4 space-y-3 bg-slate-50">
//                 {checklist.tasks.length === 0 ? (
//                   <div className="text-center py-8 text-slate-500 text-sm">
//                     No tasks yet. Click "Add Task" to get started.
//                   </div>
//                 ) : (
//                   checklist.tasks.map((task) => (
//                     <div
//                       key={task.id}
//                       className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 border-2 border-slate-200 rounded-xl bg-white hover:border-slate-300 transition-colors group"
//                     >
//                       <GripVertical className="hidden sm:block w-5 h-5 text-slate-400 mt-3 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
//                       <div className="flex-1 space-y-3 sm:space-y-4 min-w-0">
//                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
//                           <div className="sm:col-span-2">
//                             <label className="block text-xs font-semibold text-slate-600 mb-2">
//                               Task Name
//                             </label>
//                             <input
//                               type="text"
//                               value={task.name}
//                               onChange={(e) =>
//                                 updateTask(
//                                   checklist.id,
//                                   task.id,
//                                   "name",
//                                   e.target.value
//                                 )
//                               }
//                               placeholder="Enter task name..."
//                               className="w-full border-2 border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-xs font-semibold text-slate-600 mb-2">
//                               Status
//                             </label>
//                             <select
//                               value={task.status}
//                               onChange={(e) =>
//                                 updateTask(
//                                   checklist.id,
//                                   task.id,
//                                   "status",
//                                   e.target.value
//                                 )
//                               }
//                               className={`w-full border-2 rounded-lg px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-4 transition-all ${getStatusColor(
//                                 task.status
//                               )}`}
//                             >
//                               <option>Not Started</option>
//                               <option>In Progress</option>
//                               <option>Completed</option>
//                             </select>
//                           </div>
//                         </div>
//                         <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center pt-2 border-t border-slate-100">
//                           <button
//                             type="button"
//                             className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium flex items-center gap-1.5 px-2 sm:px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors"
//                           >
//                             <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                             <span>Asset</span>
//                           </button>
//                           <button
//                             type="button"
//                             className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium flex items-center gap-1.5 px-2 sm:px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors"
//                           >
//                             <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                             <span>Assign</span>
//                           </button>
//                           <div className="flex-1"></div>
//                           <button
//                             type="button"
//                             onClick={() => removeTask(checklist.id, task.id)}
//                             className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
//                             aria-label="Remove task"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}

//                 <button
//                   type="button"
//                   onClick={() => addTask(checklist.id)}
//                   className="w-full py-3 sm:py-4 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 text-sm sm:text-base font-medium hover:bg-blue-50 hover:border-blue-400 transition-all flex items-center justify-center gap-2"
//                 >
//                   <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
//                   <span>Add Task</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// export default ChecklistSection;





import React, { useState, useEffect } from "react";
import { Plus, CheckCircle2, ChevronDown, GripVertical, Briefcase, User, Trash2, ListChecks, X, Search } from "lucide-react";
import { getAllChecklists } from "../../../api/Checklist";

// ChecklistSection Component
function ChecklistSection({ checklists, setChecklists }) {
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [existingChecklists, setExistingChecklists] = useState([]);
  const [loadingChecklists, setLoadingChecklists] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch existing checklists when modal opens
  useEffect(() => {
    if (showChecklistModal) {
      fetchExistingChecklists();
    }
  }, [showChecklistModal]);

  const fetchExistingChecklists = async () => {
    try {
      setLoadingChecklists(true);
      const response = await getAllChecklists({
        limit: 100,
        status: 'active'
      });
      
      if (response.ok) {
        setExistingChecklists(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching checklists:", error);
    } finally {
      setLoadingChecklists(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  const addEmptyChecklist = () => {
    setChecklists([
      ...checklists,
      { id: Date.now(), name: "New Checklist", isExpanded: true, tasks: [] },
    ]);
    setShowChecklistModal(false);
  };

  const addExistingChecklist = (existingChecklist) => {
    // Convert the existing checklist to the work order format
    const newChecklist = {
      id: Date.now(),
      checklistId: existingChecklist._id, // Reference to original checklist
      name: existingChecklist.name,
      isExpanded: true,
      tasks: existingChecklist.tasks.map(task => ({
        id: Date.now() + Math.random(), // Generate unique ID for work order task
        taskId: task._id, // Reference to original task
        name: task.description,
        asset: task.asset || "",
        status: "Not Started"
      }))
    };

    setChecklists([...checklists, newChecklist]);
    setShowChecklistModal(false);
    setSearchQuery("");
  };

  const removeChecklist = (checklistId) => {
    setChecklists(checklists.filter((c) => c.id !== checklistId));
  };

  const toggleChecklist = (checklistId) => {
    setChecklists(
      checklists.map((c) =>
        c.id === checklistId ? { ...c, isExpanded: !c.isExpanded } : c
      )
    );
  };

  const updateChecklistName = (checklistId, name) => {
    setChecklists(
      checklists.map((c) => (c.id === checklistId ? { ...c, name } : c))
    );
  };

  const addTask = (checklistId) => {
    setChecklists((prev) =>
      prev.map((list) =>
        list.id === checklistId
          ? {
              ...list,
              tasks: [
                ...list.tasks,
                { id: Date.now(), name: "", asset: "", status: "Not Started" },
              ],
            }
          : list
      )
    );
  };

  const updateTask = (checklistId, taskId, field, value) => {
    setChecklists((prev) =>
      prev.map((list) =>
        list.id === checklistId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, [field]: value } : task
              ),
            }
          : list
      )
    );
  };

  const removeTask = (checklistId, taskId) => {
    setChecklists((prev) =>
      prev.map((list) =>
        list.id === checklistId
          ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
          : list
      )
    );
  };

  // Filter checklists based on search
  const filteredChecklists = existingChecklists.filter(checklist =>
    checklist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (checklist.section && checklist.section.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Tasks & Checklists
            </h2>
          </div>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => addTask(checklists[0]?.id)}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
            <button
              type="button"
              onClick={() => setShowChecklistModal(true)}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Checklist</span>
            </button>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {checklists.map((checklist) => (
            <div
              key={checklist.id}
              className="border-2 border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors"
            >
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-3 sm:p-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <ListChecks className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 flex-shrink-0" />
                  <input
                    type="text"
                    value={checklist.name}
                    onChange={(e) =>
                      updateChecklistName(checklist.id, e.target.value)
                    }
                    className="text-sm sm:text-base font-bold text-slate-800 bg-transparent border-none focus:outline-none flex-1 placeholder:text-slate-400 min-w-0"
                    placeholder="Checklist Name"
                  />
                </div>
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <span className="text-xs sm:text-sm font-medium text-slate-600 bg-white px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                    {checklist.tasks.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeChecklist(checklist.id)}
                    className="text-red-600 hover:text-red-700 p-1.5 sm:p-2 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Remove checklist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleChecklist(checklist.id)}
                    className="text-slate-600 hover:text-slate-800 p-1.5 sm:p-2 hover:bg-white rounded-lg transition-colors"
                    aria-label="Toggle checklist"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        checklist.isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {checklist.isExpanded && (
                <div className="p-3 sm:p-4 space-y-3 bg-slate-50">
                  {checklist.tasks.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 text-sm">
                      No tasks yet. Click "Add Task" to get started.
                    </div>
                  ) : (
                    checklist.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 border-2 border-slate-200 rounded-xl bg-white hover:border-slate-300 transition-colors group"
                      >
                        <GripVertical className="hidden sm:block w-5 h-5 text-slate-400 mt-3 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        <div className="flex-1 space-y-3 sm:space-y-4 min-w-0">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-semibold text-slate-600 mb-2">
                                Task Name
                              </label>
                              <input
                                type="text"
                                value={task.name}
                                onChange={(e) =>
                                  updateTask(
                                    checklist.id,
                                    task.id,
                                    "name",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter task name..."
                                className="w-full border-2 border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-600 mb-2">
                                Status
                              </label>
                              <select
                                value={task.status}
                                onChange={(e) =>
                                  updateTask(
                                    checklist.id,
                                    task.id,
                                    "status",
                                    e.target.value
                                  )
                                }
                                className={`w-full border-2 rounded-lg px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-4 transition-all ${getStatusColor(
                                  task.status
                                )}`}
                              >
                                <option>Not Started</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center pt-2 border-t border-slate-100">
                            <div className="flex-1">
                              <input
                                type="text"
                                value={task.asset || ""}
                                onChange={(e) =>
                                  updateTask(
                                    checklist.id,
                                    task.id,
                                    "asset",
                                    e.target.value
                                  )
                                }
                                placeholder="Asset (optional)"
                                className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-blue-500"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeTask(checklist.id, task.id)}
                              className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                              aria-label="Remove task"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  <button
                    type="button"
                    onClick={() => addTask(checklist.id)}
                    className="w-full py-3 sm:py-4 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 text-sm sm:text-base font-medium hover:bg-blue-50 hover:border-blue-400 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Add Task</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Checklist Selection Modal */}
      {showChecklistModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">Add Checklist</h3>
              <button
                onClick={() => {
                  setShowChecklistModal(false);
                  setSearchQuery("");
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-6 border-b border-slate-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search checklists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-3">
                {/* Create Empty Checklist Option */}
                <button
                  type="button"
                  onClick={addEmptyChecklist}
                  className="w-full p-4 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">Create Empty Checklist</span>
                </button>

                {/* Loading State */}
                {loadingChecklists && (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-slate-600">Loading checklists...</p>
                  </div>
                )}

                {/* Existing Checklists */}
                {!loadingChecklists && filteredChecklists.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      Existing Checklists
                    </h4>
                    {filteredChecklists.map((checklist) => (
                      <button
                        key={checklist._id}
                        type="button"
                        onClick={() => addExistingChecklist(checklist)}
                        className="w-full p-4 border-2 border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h5 className="font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                              {checklist.name}
                            </h5>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                              {checklist.section && (
                                <span className="px-2 py-1 bg-slate-100 rounded">
                                  {checklist.section}
                                </span>
                              )}
                              <span>{checklist.tasks?.length || 0} tasks</span>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <Plus className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* No Results */}
                {!loadingChecklists && filteredChecklists.length === 0 && searchQuery && (
                  <div className="text-center py-8 text-slate-500">
                    <p>No checklists found matching "{searchQuery}"</p>
                  </div>
                )}

                {/* No Checklists */}
                {!loadingChecklists && existingChecklists.length === 0 && !searchQuery && (
                  <div className="text-center py-8 text-slate-500">
                    <p>No saved checklists available.</p>
                    <p className="text-sm mt-2">Create your first checklist to reuse it here.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setShowChecklistModal(false);
                  setSearchQuery("");
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChecklistSection;