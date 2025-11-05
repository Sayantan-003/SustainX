//WorkOrderFilter
import { useState, useEffect } from "react";
import {
  Filter,
  ChevronDown,
  Trash2,
  Flag,
  X,
  MapPin,
  Calendar,
  LockOpen,
  Lock,
  Loader,
  User,
} from "lucide-react";

function Dropdown({
  label,
  icon: Icon,
  iconColor,
  options,
  value,
  onChange,
  multiSelect = false,
}) {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(
    multiSelect ? (Array.isArray(value) ? value : []) : []
  );

  useEffect(() => {
    if (multiSelect) {
      setSelectedValues(Array.isArray(value) ? value : []);
    }
  }, [value, multiSelect]);

  const getDisplayText = () => {
    if (multiSelect) {
      const selected = options.filter(
        (opt) => selectedValues.includes(opt.value) && opt.value !== "None"
      );
      if (selected.length === 0) return null;
      return selected.map((s) => s.label).join(" or ");
    }

    const selectedOption = options.find((opt) => opt.value === value);
    return selectedOption && selectedOption.value !== "None"
      ? selectedOption.label
      : null;
  };

  const handleOptionClick = (optValue) => {
    if (multiSelect) {
      let newValues;
      if (optValue === "None") {
        newValues = [];
      } else {
        if (selectedValues.includes(optValue)) {
          newValues = selectedValues.filter((v) => v !== optValue);
        } else {
          newValues = [...selectedValues.filter((v) => v !== "None"), optValue];
        }
      }
      setSelectedValues(newValues);
      onChange(newValues);
    } else {
      onChange(optValue);
      setOpen(false);
    }
  };

  const isSelected = (optValue) => {
    if (multiSelect) {
      return (
        selectedValues.includes(optValue) ||
        (optValue === "None" && selectedValues.length === 0)
      );
    }
    return value === optValue;
  };

  const displayText = getDisplayText();

  return (
    <div className="relative">
      {/* Button */}
      <button
        id={`dropdown-btn-${label}`}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-normal bg-white hover:border-slate-300 transition-all min-w-[160px] justify-between"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4" style={{ color: iconColor }} />}
          <span className="text-slate-600">{label}</span>
          {displayText && (
            <>
              <span className="text-slate-400">:</span>
              <span className="text-blue-600 font-medium">{displayText}</span>
            </>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            className="fixed mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden"
            style={{
              top: `${
                document
                  .getElementById(`dropdown-btn-${label}`)
                  ?.getBoundingClientRect().bottom + 8
              }px`,
              left: `${
                document
                  .getElementById(`dropdown-btn-${label}`)
                  ?.getBoundingClientRect().left
              }px`,
            }}
          >
            <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100">
              <span className="text-sm font-semibold text-slate-700">
                {label}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (multiSelect) {
                    setSelectedValues([]);
                    onChange([]);
                  } else {
                    onChange("None");
                  }
                  setOpen(false);
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                title="Clear selection"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto">
              {options.map((opt) => (
                <div
                  key={opt.value}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer text-sm transition-colors ${
                    isSelected(opt.value)
                      ? "bg-blue-50 hover:bg-blue-100"
                      : "hover:bg-slate-50"
                  }`}
                  onClick={() => handleOptionClick(opt.value)}
                >
                  {/* Icon for status options */}
                  {opt.icon && (
                    <opt.icon
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: opt.iconColor }}
                    />
                  )}

                  {/* Colored dot for priority */}
                  {opt.color && (
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: opt.color }}
                    />
                  )}

                  <span
                    className={`flex-1 ${
                      isSelected(opt.value)
                        ? "font-medium text-slate-900"
                        : "text-slate-700"
                    }`}
                  >
                    {opt.label}
                  </span>

                  {/* Checkbox */}
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                      isSelected(opt.value)
                        ? "bg-blue-600 border-blue-600"
                        : "border-slate-300"
                    }`}
                  >
                    {isSelected(opt.value) && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function WorkOrderFilters({
  showFilters = true,
  setShowFilters = () => {},
  statusFilter = [],
  setStatusFilter = () => {},
  priorityFilter = [],
  setPriorityFilter = () => {},
  locationFilter = [],
  setLocationFilter = () => {},
  dueDateFilter = [],
  setDueDateFilter = () => {},
  userFilter = [],
  setUserFilter = () => {},
  query = "",
  clearFilters = () => {
    setStatusFilter([]);
    setPriorityFilter([]);
    setLocationFilter([]);
    setDueDateFilter([]);
    setUserFilter([]);
  },
  resultCount = 0,
}) {
  const hasActiveFilters = () => {
    return (
      (Array.isArray(statusFilter)
        ? statusFilter.length > 0
        : statusFilter !== "None") ||
      (Array.isArray(priorityFilter)
        ? priorityFilter.length > 0
        : priorityFilter !== "None") ||
      (Array.isArray(locationFilter)
        ? locationFilter.length > 0
        : locationFilter !== "None") ||
      (Array.isArray(dueDateFilter)
        ? dueDateFilter.length > 0
        : dueDateFilter !== "None") ||
      (Array.isArray(userFilter)
        ? userFilter.length > 0
        : userFilter !== "None") ||
      query
    );
  };

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="px-6 py-4">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Show/Hide Filters toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? "Hide" : "Show"} Filters
          </button>

          {showFilters && (
            <>
              {/* Status Filter - Multi-select */}
              <Dropdown
                label="Status"
                icon={Loader}
                iconColor="#3b82f6"
                value={statusFilter}
                onChange={setStatusFilter}
                multiSelect={true}
                options={[
                  { value: "None", label: "None" },
                  {
                    value: "Open",
                    label: "Open",
                    icon: LockOpen,
                    iconColor: "#10b981",
                  },
                  {
                    value: "In Progress",
                    label: "In Progress",
                    icon: Loader,
                    iconColor: "#f59e0b",
                  },
                  {
                    value: "Closed",
                    label: "Closed",
                    icon: Lock,
                    iconColor: "#ef4444",
                  },
                ]}
              />

              {/* Priority Filter*/}
              <Dropdown
                label="Priority"
                icon={Flag}
                iconColor="#8b5cf6"
                value={priorityFilter}
                onChange={setPriorityFilter}
                multiSelect={true}
                options={[
                  { value: "None", label: "None" },
                  { value: "Low", label: "Low", color: "#10b981" },
                  { value: "Medium", label: "Medium", color: "#f59e0b" },
                  { value: "High", label: "High", color: "#ef4444" },
                ]}
              />

              {/* Location Filter - Multi-select */}
              <Dropdown
                label="Location"
                icon={MapPin}
                iconColor="#ec4899"
                value={locationFilter}
                onChange={setLocationFilter}
                multiSelect={true}
                options={[
                  { value: "None", label: "None" },
                  { value: "Building A", label: "Building A" },
                  { value: "Building B", label: "Building B" },
                  { value: "Building C", label: "Building C" },
                  { value: "Warehouse", label: "Warehouse" },
                  { value: "Office", label: "Office" },
                ]}
              />

              {/* Due Date Filter - Multi-select */}
              <Dropdown
                label="Due Date"
                icon={Calendar}
                iconColor="#14b8a6"
                value={dueDateFilter}
                onChange={setDueDateFilter}
                multiSelect={true}
                options={[
                  { value: "None", label: "None" },
                  { value: "Today", label: "Today" },
                  { value: "This Week", label: "This Week" },
                  { value: "This Month", label: "This Month" },
                  { value: "Overdue", label: "Overdue" },
                  { value: "Next 7 Days", label: "Next 7 Days" },
                  { value: "Next 30 Days", label: "Next 30 Days" },
                ]}
              />

              {/* Assigned to Filter - Multi-select */}
              <Dropdown
                label="Assigned to"
                icon={User}
                iconColor="#6366f1"
                value={userFilter}
                onChange={setUserFilter}
                multiSelect={true}
                options={[
                  { value: "None", label: "None" },
                  { value: "User 1", label: "User 1" },
                  { value: "User 2", label: "User 2" },
                  { value: "User 3", label: "User 3" },
                  { value: "User 4", label: "User 4" },
                  { value: "User 5", label: "User 5" },
                ]}
              />

              {/* Clear Filters */}
              {hasActiveFilters() && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 font-medium px-2 transition-colors"
                >
                  <X className="w-4 h-4" /> Clear all filters
                </button>
              )}
            </>
          )}

          {/* Result count */}
          <div className="ml-auto text-sm text-slate-500 font-medium">
            {resultCount} {resultCount === 1 ? "result" : "results"}
          </div>
        </div>
      </div>
    </div>
  );
}

