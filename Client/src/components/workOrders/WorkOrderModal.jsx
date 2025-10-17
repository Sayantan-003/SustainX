// import { X } from "lucide-react";
// import WorkOrderForm from "./WorkOrderForm";

// export default function WorkOrderModal({
//   show,
//   close,
//   newWorkOrder,
//   setNewWorkOrder,
//   createWorkOrder,
// }) {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-slate-200 flex items-center justify-between">
//           <h2 className="text-2xl font-bold text-slate-800">Create New Work Order</h2>
//           <button
//             onClick={close}
//             className="text-slate-400 hover:text-slate-600 transition-colors"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <WorkOrderForm
//           newWorkOrder={newWorkOrder}
//           setNewWorkOrder={setNewWorkOrder}
//         />

//         <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
//           <button
//             onClick={close}
//             className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={createWorkOrder}
//             disabled={!newWorkOrder.title.trim()}
//             className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
//           >
//             Create Work Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// import { X } from "lucide-react";
// import { useRef } from "react";
// import WorkOrderForm from "./WorkOrderForm";

// export default function WorkOrderModal({
//   show,
//   close,
//   createWorkOrder,
//   sidebarIsOpen,
// }) {
//   const formRef = useRef();
//   if (!show) return null;

//   return (
//     <div 
//       className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-all duration-300
//       ${sidebarIsOpen ? "lg:pl-64" : "pl-0"}`}
//     >
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-slate-200 flex items-center justify-between">
//           <h2 className="text-2xl font-bold text-slate-800">Create New Work Order</h2>
//           <button
//             onClick={close}
//             className="text-slate-400 hover:text-slate-600 transition-colors"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <WorkOrderForm
//           ref={formRef}
//           onSubmit={createWorkOrder}
//           onClose={close}
//         />

//         <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
//           <button
//             onClick={close}
//             className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { X } from "lucide-react";
import WorkOrderForm from "./WorkOrderForm";

export default function WorkOrderModal({
  show,
  close,
  createWorkOrder,
  sidebarIsOpen,
}) {
  if (!show) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-all duration-300
      ${sidebarIsOpen ? "lg:pl-64" : "pl-0"}`}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Create New Work Order</h2>
          <button
            onClick={close}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <WorkOrderForm
          onSubmit={createWorkOrder}
          onClose={close}
        />
      </div>
    </div>
  );
}