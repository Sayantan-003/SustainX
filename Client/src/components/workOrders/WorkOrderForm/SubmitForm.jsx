// //WorkOrderForm/SubmitForm.jsx

// import React, { useState } from "react";

// export default function SubmitForm({ isSubmitting, onClose }) {
//   const [showConfirm, setShowConfirm] = useState(false);

//   return (
//     <div className="flex justify-end gap-4">
//       <button
//         type="button"
//         onClick={() => setShowConfirm(true)}
//         className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl transition"
//       >
//         Cancel
//       </button>
//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className={`px-6 py-3 rounded-xl font-medium text-white transition ${
//           isSubmitting
//             ? "bg-blue-400 cursor-not-allowed"
//             : "bg-blue-600 hover:bg-blue-700"
//         }`}
//       >
//         {isSubmitting ? "Creating..." : "Create Work Order"}
//       </button>

//       {showConfirm && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center">
//             <h3 className="text-lg font-semibold text-slate-800 mb-4">
//               Cancel Work Order Creation?
//             </h3>
//             <p className="text-slate-600 mb-6">
//               Unsaved changes will be lost. Are you sure you want to cancel?
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium"
//               >
//                 Continue Editing
//               </button>
//               <button
//                 onClick={onClose}
//                 className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium"
//               >
//                 Confirm Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// SubmitForm Component


import React, { useState } from "react";


function SubmitForm({ isSubmitting, onClose }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 rounded-xl font-medium text-white transition ${
            isSubmitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Creating..." : "Create Work Order"}
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Cancel Work Order Creation?
            </h3>
            <p className="text-slate-600 mb-6">
              Unsaved changes will be lost. Are you sure you want to cancel?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium"
              >
                Continue Editing
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default SubmitForm;