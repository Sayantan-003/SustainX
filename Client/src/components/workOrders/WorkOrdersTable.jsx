// // import { Clock } from "lucide-react";
// // import { formatDate } from "../../utils/formatDate";

// // export default function WorkOrdersTable({ filtered }) {
// //   return (
// //     <div className="overflow-x-auto">
// //       <table className="w-full">
// //         <thead className="text-left text-xs uppercase text-slate-600 bg-slate-50 border-b border-slate-200">
// //           <tr>
// //             <th className="p-4 font-semibold">WO #</th>
// //             <th className="p-4 font-semibold">Work Order Title</th>
// //             <th className="p-4 font-semibold">Description</th>
// //             <th className="p-4 font-semibold">Due Date</th>
// //             <th className="p-4 font-semibold">Start Date</th>
// //             <th className="p-4 font-semibold">Status</th>
// //             <th className="p-4 font-semibold">Priority</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {filtered.length === 0 ? (
// //             <tr>
// //               <td colSpan="7" className="p-8 text-center text-slate-500">
// //                 No work orders found. Try adjusting your filters.
// //               </td>
// //             </tr>
// //           ) : (
// //             filtered.map((wo) => (
// //               <tr
// //                 key={wo.id}
// //                 className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
// //               >
// //                 <td className="p-4 text-blue-600 font-semibold">#{wo.id}</td>
// //                 <td className="p-4 font-medium text-slate-800">{wo.title}</td>
// //                 <td className="p-4 text-slate-600 text-sm">{wo.description}</td>
// //                 <td className="p-4 text-sm text-slate-700">
// //                   {formatDate(wo.due)}
// //                 </td>
// //                 <td className="p-4 text-sm text-slate-700">
// //                   {formatDate(wo.start)}
// //                 </td>
// //                 <td className="p-4">
// //                   <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
// //                     <Clock className="w-3 h-3" /> {wo.status}
// //                   </span>
// //                 </td>
// //                 <td className="p-4">
// //                   <span
// //                     className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
// //                       wo.priority === "Low"
// //                         ? "bg-emerald-100 text-emerald-700"
// //                         : wo.priority === "Medium"
// //                         ? "bg-amber-100 text-amber-700"
// //                         : "bg-red-100 text-red-700"
// //                     }`}
// //                   >
// //                     <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
// //                     {wo.priority}
// //                   </span>
// //                 </td>
// //               </tr>
// //             ))
// //           )}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }


// import {
//   LockKeyholeOpen,
//   LockKeyhole,
//   Clock,
//   AlertTriangle,
//   Flag,
// } from "lucide-react";
// import { formatDate } from "../../utils/formatDate";

// export default function WorkOrdersTable({ filtered }) {
//   const getStatusBadge = (status) => {
//     const lower = status?.toLowerCase();

//     switch (lower) {
//       case "open":
//         return {
//           icon: <LockKeyholeOpen className="w-3 h-3" />,
//           color: "bg-amber-100 text-amber-700",
//           label: "Open",
//         };
//       case "closed":
//         return {
//           icon: <LockKeyhole className="w-3 h-3" />,
//           color: "bg-emerald-100 text-emerald-700",
//           label: "Closed",
//         };
//       case "pending":
//         return {
//           icon: <Clock className="w-3 h-3" />,
//           color: "bg-slate-200 text-slate-700",
//           label: "Pending",
//         };
//       case "overdue":
//         return {
//           icon: <AlertTriangle className="w-3 h-3" />,
//           color: "bg-red-100 text-red-700",
//           label: "Overdue",
//         };
//       default:
//         return {
//           icon: <Clock className="w-3 h-3" />,
//           color: "bg-slate-100 text-slate-700",
//           label: status || "Unknown",
//         };
//     }
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full">
//         <thead className="text-left text-xs uppercase text-slate-600 bg-slate-50 border-b border-slate-200">
//           <tr>
//             <th className="p-4 font-semibold">WO #</th>
//             <th className="p-4 font-semibold">Work Order Title</th>
//             <th className="p-4 font-semibold">Description</th>
//             <th className="p-4 font-semibold">Due Date</th>
//             <th className="p-4 font-semibold">Start Date</th>
//             <th className="p-4 font-semibold">Status</th>
//             <th className="p-4 font-semibold">Priority</th>
//             <th className="p-4 font-semibold">Categories</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filtered.length === 0 ? (
//             <tr>
//               <td colSpan="8" className="p-8 text-center text-slate-500">
//                 No work orders found. Try adjusting your filters.
//               </td>
//             </tr>
//           ) : (
//             filtered.map((wo) => {
//               const statusBadge = getStatusBadge(wo.status);

//               return (
//                 <tr
//                   key={wo.id}
//                   className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
//                 >
//                   <td className="p-4 text-blue-600 font-semibold">#{wo.id}</td>
//                   <td className="p-4 font-medium text-slate-800">{wo.title}</td>
//                   <td className="p-4 text-slate-600 text-sm">{wo.description}</td>
//                   <td className="p-4 text-sm text-slate-700">
//                     {formatDate(wo.due)}
//                   </td>
//                   <td className="p-4 text-sm text-slate-700">
//                     {formatDate(wo.start)}
//                   </td>
//                   <td className="p-4">
//                     <span
//                       className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}
//                     >
//                       {statusBadge.icon}
//                       {statusBadge.label}
//                     </span>
//                   </td>

//                   <td className="p-4">
//                     <span
//                       className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
//                         wo.priority === "Low"
//                           ? "bg-emerald-100 text-emerald-700"
//                           : wo.priority === "Medium"
//                           ? "bg-amber-100 text-amber-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       <Flag className="w-3 h-3" /> {wo.priority}
//                     </span>
//                   </td>
//                 </tr>
//               );
//             })
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }


// //WorkOrderTable.jsx
// import {
//   LockKeyholeOpen,
//   LockKeyhole,
//   Clock,
//   AlertTriangle,
//   Flag,
// } from "lucide-react";

// // Utility function to format dates
// const formatDate = (dateString) => {
//   if (!dateString) return "N/A";
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });
// };

// export default function WorkOrdersTable({ filtered }) {
//   const getStatusBadge = (status, dueDate) => {
//     // Check if work order is overdue
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
    
//     const due = dueDate ? new Date(dueDate) : null;
//     if (due) {
//       due.setHours(0, 0, 0, 0);
//     }
    
//     // If today's date > due date and status is not "Closed", mark as Overdue
//     const isOverdue = due && today > due && status?.toLowerCase() !== "closed";
    
//     if (isOverdue) {
//       return {
//         icon: <AlertTriangle className="w-3 h-3" />,
//         color: "bg-red-100 text-red-700",
//         label: "Overdue",
//       };
//     }

//     const lower = status?.toLowerCase();

//     switch (lower) {
//       case "open":
//         return {
//           icon: <LockKeyholeOpen className="w-3 h-3" />,
//           color: "bg-amber-100 text-amber-700",
//           label: "Open",
//         };
//       case "closed":
//         return {
//           icon: <LockKeyhole className="w-3 h-3" />,
//           color: "bg-emerald-100 text-emerald-700",
//           label: "Closed",
//         };
//       case "pending":
//         return {
//           icon: <Clock className="w-3 h-3" />,
//           color: "bg-slate-200 text-slate-700",
//           label: "Pending",
//         };
//       case "overdue":
//         return {
//           icon: <AlertTriangle className="w-3 h-3" />,
//           color: "bg-red-100 text-red-700",
//           label: "Overdue",
//         };
//       default:
//         return {
//           icon: <Clock className="w-3 h-3" />,
//           color: "bg-slate-100 text-slate-700",
//           label: status || "Unknown",
//         };
//     }
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full">
//         <thead className="text-left text-xs uppercase text-slate-600 bg-slate-50 border-b border-slate-200">
//           <tr>
//             <th className="p-4 font-semibold">WO #</th>
//             <th className="p-4 font-semibold">Work Order Title</th>
//             <th className="p-4 font-semibold">Description</th>
//             <th className="p-4 font-semibold">Due Date</th>
//             <th className="p-4 font-semibold">Start Date</th>
//             <th className="p-4 font-semibold">Status</th>
//             <th className="p-4 font-semibold">Priority</th>
//             <th className="p-4 font-semibold">Categories</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filtered.length === 0 ? (
//             <tr>
//               <td colSpan="8" className="p-8 text-center text-slate-500">
//                 No work orders found. Try adjusting your filters.
//               </td>
//             </tr>
//           ) : (
//             filtered.map((wo) => {
//               const statusBadge = getStatusBadge(wo.status, wo.due || wo.dueDate);

//               return (
//                 <tr
//                   key={wo.id}
//                   className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
//                 >
//                   <td className="p-4 text-blue-600 font-semibold">#{wo.id}</td>
//                   <td className="p-4 font-medium text-slate-800">{wo.title}</td>
//                   <td className="p-4 text-slate-600 text-sm">{wo.description}</td>
//                   <td className="p-4 text-sm text-slate-700">
//                     {formatDate(wo.due || wo.dueDate)}
//                   </td>
//                   <td className="p-4 text-sm text-slate-700">
//                     {formatDate(wo.start || wo.startDate)}
//                   </td>
//                   <td className="p-4">
//                     <span
//                       className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}
//                     >
//                       {statusBadge.icon}
//                       {statusBadge.label}
//                     </span>
//                   </td>

//                   <td className="p-4">
//                     <span
//                       className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
//                         wo.priority === "Low"
//                           ? "bg-emerald-100 text-emerald-700"
//                           : wo.priority === "Medium"
//                           ? "bg-amber-100 text-amber-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       <Flag className="w-3 h-3" /> {wo.priority}
//                     </span>
//                   </td>

//                   <td className="p-4 text-sm text-slate-700">
//                     {wo.category || "N/A"}
//                   </td>
//                 </tr>
//               );
//             })
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


import {
  LockKeyholeOpen,
  LockKeyhole,
  Clock,
  AlertTriangle,
  Flag,
} from "lucide-react";

// Utility function to format dates
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function WorkOrdersTable({ filtered, onRowClick }) {
  const getStatusBadge = (status, dueDate) => {
    // Check if work order is overdue
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
    
    const due = dueDate ? new Date(dueDate) : null;
    if (due) {
      due.setHours(0, 0, 0, 0);
    }
    
    // If today's date > due date and status is not "Closed", mark as Overdue
    const isOverdue = due && today > due && status?.toLowerCase() !== "closed";
    
    if (isOverdue) {
      return {
        icon: <AlertTriangle className="w-3 h-3" />,
        color: "bg-red-100 text-red-700",
        label: "Overdue",
      };
    }

    const lower = status?.toLowerCase();

    switch (lower) {
      case "open":
        return {
          icon: <LockKeyholeOpen className="w-3 h-3" />,
          color: "bg-amber-100 text-amber-700",
          label: "Open",
        };
      case "closed":
        return {
          icon: <LockKeyhole className="w-3 h-3" />,
          color: "bg-emerald-100 text-emerald-700",
          label: "Closed",
        };
      case "pending":
        return {
          icon: <Clock className="w-3 h-3" />,
          color: "bg-slate-200 text-slate-700",
          label: "Pending",
        };
      case "overdue":
        return {
          icon: <AlertTriangle className="w-3 h-3" />,
          color: "bg-red-100 text-red-700",
          label: "Overdue",
        };
      default:
        return {
          icon: <Clock className="w-3 h-3" />,
          color: "bg-slate-100 text-slate-700",
          label: status || "Unknown",
        };
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="text-left text-xs uppercase text-slate-600 bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-4 font-semibold">WO #</th>
            <th className="p-4 font-semibold">Work Order Title</th>
            <th className="p-4 font-semibold">Description</th>
            <th className="p-4 font-semibold">Due Date</th>
            <th className="p-4 font-semibold">Start Date</th>
            <th className="p-4 font-semibold">Status</th>
            <th className="p-4 font-semibold">Priority</th>
            <th className="p-4 font-semibold">Categories</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="8" className="p-8 text-center text-slate-500">
                No work orders found. Try adjusting your filters.
              </td>
            </tr>
          ) : (
            filtered.map((wo) => {
              const statusBadge = getStatusBadge(wo.status, wo.due || wo.dueDate);

              return (
                <tr
                  key={wo.id}
                  onClick={() => onRowClick?.(wo)}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="p-4 text-blue-600 font-semibold">#{wo.id}</td>
                  <td className="p-4 font-medium text-slate-800">{wo.title}</td>
                  <td className="p-4 text-slate-600 text-sm">{wo.description}</td>
                  <td className="p-4 text-sm text-slate-700">
                    {formatDate(wo.due || wo.dueDate)}
                  </td>
                  <td className="p-4 text-sm text-slate-700">
                    {formatDate(wo.start || wo.startDate)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}
                    >
                      {statusBadge.icon}
                      {statusBadge.label}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        wo.priority === "Low"
                          ? "bg-emerald-100 text-emerald-700"
                          : wo.priority === "Medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      <Flag className="w-3 h-3" /> {wo.priority}
                    </span>
                  </td>

                  <td className="p-4 text-sm text-slate-700">
                    {wo.category || "N/A"}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}