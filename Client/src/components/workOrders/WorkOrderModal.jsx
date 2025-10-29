import { useEffect } from "react";
import { X } from "lucide-react";
import WorkOrderForm from "./WorkOrderForm/WorkOrderForm";



export default function WorkOrderModal({
  show,
  close,
  createWorkOrder,
  sidebarIsOpen,
}) {
  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && show) {
        close();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [show, close]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-all duration-300
      ${sidebarIsOpen ? "lg:pl-64" : "pl-0"}`}
      onClick={(e) => {
        // Close modal when clicking on backdrop
        if (e.target === e.currentTarget) {
          close();
        }
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header with Close Button */}
        <div className="bg-white rounded-t-2xl shadow-sm border-b border-slate-200 p-8 sticky top-0 z-10">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Work Order</h1>
              <p className="text-slate-600">Fill in the details to create a new work order</p>
            </div>
            <button
              onClick={close}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-slate-400 hover:text-slate-600" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <WorkOrderForm
          onSubmit={createWorkOrder}
          onClose={close}
        />
      </div>
    </div>
  );
}