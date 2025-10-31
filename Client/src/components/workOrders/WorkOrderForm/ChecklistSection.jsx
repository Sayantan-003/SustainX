// //WorkOrderForm/ChecklistSection.jsx:


// import React from "react";
// import { Plus, CheckCircle2,ChevronDown,GripVertical,Briefcase,User,Trash2 } from "lucide-react";

// export default function ChecklistSection({ checklists, setChecklists }) {

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


// /***************************Checklist Options***************/

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


//    const updateChecklistName = (checklistId, name) => {
//     setChecklists(
//       checklists.map((c) => (c.id === checklistId ? { ...c, name } : c))
//     );
//   };

// /*********************************Taks Options**************************/
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
//     <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
//             <CheckCircle2 className="w-5 h-5 text-white" />
//           </div>
//           <h2 className="text-xl font-bold text-slate-900">
//             Tasks & Checklists
//           </h2>
//         </div>
//         <div className="flex gap-3">
//           <button
//             type="button"
//             onClick={() => addTask(checklists[0]?.id)}
//             className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
//           >
//             <Plus className="w-4 h-4" />
//             Add Task
//           </button>
//           <button
//             type="button"
//             onClick={addChecklist}
//             className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
//           >
//             <Plus className="w-4 h-4" />
//             Add Checklist
//           </button>
//         </div>
//       </div>

//       <div className="space-y-4">
//         {checklists.map((checklist) => (
//           <div
//             key={checklist.id}
//             className="border-2 border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors"
//           >
//             <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 flex items-center justify-between">
//               <input
//                 type="text"
//                 value={checklist.name}
//                 onChange={(e) =>
//                   updateChecklistName(checklist.id, e.target.value)
//                 }
//                 className="text-base font-bold text-slate-800 bg-transparent border-none focus:outline-none flex-1 placeholder:text-slate-400"
//                 placeholder="Checklist Name"
//               />
//               <div className="flex items-center gap-3">
//                 <span className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-full">
//                   {checklist.tasks.length}{" "}
//                   {checklist.tasks.length === 1 ? "task" : "tasks"}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={() => removeChecklist(checklist.id)}
//                   className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition-colors"
//                 >
//                   Remove
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => toggleChecklist(checklist.id)}
//                   className="text-slate-600 hover:text-slate-800 p-1 hover:bg-white rounded-lg transition-colors"
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
//               <div className="p-4 space-y-3 bg-slate-50">
//                 {checklist.tasks.map((task) => (
//                   <div
//                     key={task.id}
//                     className="flex items-start gap-3 p-4 border-2 border-slate-200 rounded-xl bg-white hover:border-slate-300 transition-colors group"
//                   >
//                     <GripVertical className="w-5 h-5 text-slate-400 mt-3 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity" />
//                     <div className="flex-1 space-y-4">
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div className="md:col-span-2">
//                           <label className="block text-xs font-semibold text-slate-600 mb-2">
//                             Task Name
//                           </label>
//                           <input
//                             type="text"
//                             value={task.name}
//                             onChange={(e) =>
//                               updateTask(
//                                 checklist.id,
//                                 task.id,
//                                 "name",
//                                 e.target.value
//                               )
//                             }
//                             placeholder="Enter task name..."
//                             className="w-full border-2 border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-xs font-semibold text-slate-600 mb-2">
//                             Status
//                           </label>
//                           <select
//                             value={task.status}
//                             onChange={(e) =>
//                               updateTask(
//                                 checklist.id,
//                                 task.id,
//                                 "status",
//                                 e.target.value
//                               )
//                             }
//                             className={`w-full border-2 rounded-lg px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-4 transition-all ${getStatusColor(
//                               task.status
//                             )}`}
//                           >
//                             <option>Not Started</option>
//                             <option>In Progress</option>
//                             <option>Completed</option>
//                           </select>
//                         </div>
//                       </div>
//                       <div className="flex gap-3 items-center pt-2 border-t border-slate-100">
//                         <button
//                           type="button"
//                           className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2 px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors"
//                         >
//                           <Briefcase className="w-4 h-4" />
//                           Add Asset
//                         </button>
//                         <button
//                           type="button"
//                           className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2 px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors"
//                         >
//                           <User className="w-4 h-4" />
//                           Assign User
//                         </button>
//                         <div className="flex-1"></div>
//                         <button
//                           type="button"
//                           onClick={() => removeTask(checklist.id, task.id)}
//                           className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 <button
//                   type="button"
//                   onClick={() => addTask(checklist.id)}
//                   className="w-full py-4 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 font-medium hover:bg-blue-50 hover:border-blue-400 transition-all flex items-center justify-center gap-2"
//                 >
//                   <Plus className="w-5 h-5" />
//                   Add Task to {checklist.name}
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// //WorkOrderForm/ChecklistSection
// import React from "react";
// import { Plus, CheckCircle2, ChevronDown, GripVertical, Briefcase, User, Trash2, ListChecks } from "lucide-react";

// export default function ChecklistSection({ checklists, setChecklists }) {

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

//   /***************************Checklist Options***************/

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

//   /*********************************Tasks Options**************************/
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





import React from "react";
import { Plus, CheckCircle2, ChevronDown, GripVertical, Briefcase, User, Trash2, ListChecks } from "lucide-react";


// ChecklistSection Component
function ChecklistSection({ checklists, setChecklists }) {
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

  const addChecklist = () => {
    setChecklists([
      ...checklists,
      { id: Date.now(), name: "New Checklist", isExpanded: true, tasks: [] },
    ]);
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
                { id: Date.now(), name: "", status: "Not Started" },
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

  return (
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
            onClick={addChecklist}
            className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add List</span>
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
                          <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium flex items-center gap-1.5 px-2 sm:px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span>Asset</span>
                          </button>
                          <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium flex items-center gap-1.5 px-2 sm:px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span>Assign</span>
                          </button>
                          <div className="flex-1"></div>
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
  );
}


export default ChecklistSection;