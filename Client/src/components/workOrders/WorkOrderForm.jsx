export default function WorkOrderForm({ newWorkOrder, setNewWorkOrder }) {
  return (
    <div className="p-6 space-y-5">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Work Order Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={newWorkOrder.title}
          onChange={(e) =>
            setNewWorkOrder({ ...newWorkOrder, title: e.target.value })
          }
          placeholder="Enter work order title"
          className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Description
        </label>
        <textarea
          value={newWorkOrder.description}
          onChange={(e) =>
            setNewWorkOrder({ ...newWorkOrder, description: e.target.value })
          }
          placeholder="Enter work order description"
          rows={4}
          className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Priority
          </label>
          <select
            value={newWorkOrder.priority}
            onChange={(e) =>
              setNewWorkOrder({ ...newWorkOrder, priority: e.target.value })
            }
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Status
          </label>
          <select
            value={newWorkOrder.status}
            onChange={(e) =>
              setNewWorkOrder({ ...newWorkOrder, status: e.target.value })
            }
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            <option>Open</option>
            <option>Closed</option>
          </select>
        </div>
      </div>
    </div>
  );
}
