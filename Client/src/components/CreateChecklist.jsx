import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Plus, MoreVertical, Package, Trash, Copy, AlertCircle } from "lucide-react";
import { createChecklist } from "../api/Checklist";

export default function CreateChecklist() {
  const navigate = useNavigate();
  const [checklistName, setChecklistName] = useState("");
  const [section, setSection] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    description: "",
    asset: "",
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTask, setEditTask] = useState({ description: "", asset: "" });
  const [showMoreMenu, setShowMoreMenu] = useState(null);
  const [showAssetDropdown, setShowAssetDropdown] = useState(false);
  const [showEditAssetDropdown, setShowEditAssetDropdown] = useState(false);
  
  // API state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Sample assets - replace with your actual data
  const assets = [
    { id: 1, name: "Fan Assembly-TRAN-001" },
    { id: 2, name: "Boiler Unit-MAIN-002" },
    { id: 3, name: "Water Pump-AUX-003" },
    { id: 4, name: "Gauge Assembly-MON-004" },
  ];

  const handleAddTask = () => {
    if (currentTask.description.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          description: currentTask.description,
          asset: currentTask.asset,
        },
      ]);
      setCurrentTask({ description: "", asset: "" });
      setShowTaskInput(false);
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setShowMoreMenu(null);
  };

  const handleDuplicateTask = (taskId) => {
    const taskToDuplicate = tasks.find((task) => task.id === taskId);
    if (taskToDuplicate) {
      setTasks([
        ...tasks,
        {
          ...taskToDuplicate,
          id: Date.now(),
        },
      ]);
    }
    setShowMoreMenu(null);
  };

  const handleTaskClick = (task) => {
    setEditingTaskId(task.id);
    setEditTask({ description: task.description, asset: task.asset });
  };

  const handleSaveEdit = () => {
    if (editTask.description.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTaskId
            ? { ...task, description: editTask.description, asset: editTask.asset }
            : task
        )
      );
      setEditingTaskId(null);
      setEditTask({ description: "", asset: "" });
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditTask({ description: "", asset: "" });
  };

  // Handle checklist creation
  const handleCreateChecklist = async () => {
    // Clear previous errors
    setError(null);

    // Validate
    if (!checklistName.trim()) {
      setError("Checklist name is required");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for API (remove temporary IDs)
      const checklistData = {
        name: checklistName.trim(),
        section: section.trim(),
        tasks: tasks.map(task => ({
          description: task.description,
          asset: task.asset || ""
        }))
      };

      // Call API
      const response = await createChecklist(checklistData);

      if (response.ok) {
        // Success - navigate back to checklists list
        navigate("/checklists", { 
          state: { 
            message: response.message || "Checklist created successfully" 
          } 
        });
      } else {
        // Handle API error
        setError(response.message || "Failed to create checklist");
      }
    } catch (err) {
      console.error("Error creating checklist:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-m">
              <button
                onClick={() => navigate("/checklists")}
                className="text-slate-600 hover:text-slate-900"
              >
                Checklists
              </button>
              <span className="text-slate-400 text-lg">›</span>
              <span className="text-slate-900 font-medium">Create Checklist</span>
            </div>

            {/* Close button */}
            <button
              onClick={() => navigate("/checklists")}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-800 text-sm font-medium">Error</p>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Checklist Name and Description */}
        <div className="mb-8 space-y-3">
          {/* Checklist Title */}
          <input
            type="text"
            placeholder="Untitled Checklist *"
            value={checklistName}
            onChange={(e) => setChecklistName(e.target.value)}
            className="w-full text-3xl font-normal text-slate-400 placeholder:text-slate-400 border-none focus:outline-none focus:text-slate-900 bg-transparent px-0 py-10"
          />

          {/* Description/Section */}
          <textarea
            placeholder="Section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            rows={2}
            className="w-full text-lg text-slate-600 placeholder:text-slate-400 border-none focus:outline-none resize-none bg-transparent px-0 py-2"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 mb-6"></div>

        {/* Tasks List */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id}>
              {editingTaskId === task.id ? (
                // Edit Mode
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={handleSaveEdit}
                  ></div>
                  <div className="bg-white border border-blue-300 rounded-lg p-4 shadow-sm relative z-20">
                    <div className="space-y-3">
                    {/* Task description input */}
                    <input
                      type="text"
                      placeholder="Enter task description"
                      value={editTask.description}
                      onChange={(e) =>
                        setEditTask({ ...editTask, description: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />

                    {/* Asset selector */}
                    <div className="relative">
                      <button
                        onClick={() => setShowEditAssetDropdown(!showEditAssetDropdown)}
                        className="w-full flex items-center justify-between px-3 py-2 border border-slate-300 rounded-lg text-sm text-left hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <Package className="w-4 h-4 text-slate-400" />
                          <span className={editTask.asset ? "text-slate-900" : "text-slate-400"}>
                            {editTask.asset || "Select Asset (Optional)"}
                          </span>
                        </div>
                        <svg
                          className="w-4 h-4 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {showEditAssetDropdown && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowEditAssetDropdown(false);
                            }}
                          ></div>
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-20 max-h-48 overflow-y-auto">
                            <button
                              onClick={() => {
                                setEditTask({ ...editTask, asset: "" });
                                setShowEditAssetDropdown(false);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-slate-400 hover:bg-slate-50"
                            >
                              No Asset
                            </button>
                            {assets.map((asset) => (
                              <button
                                key={asset.id}
                                onClick={() => {
                                  setEditTask({ ...editTask, asset: asset.name });
                                  setShowEditAssetDropdown(false);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                              >
                                {asset.name}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        disabled={!editTask.description.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                      >
                        Save
                      </button>
                    </div>
                    </div>
                  </div>
                </>
              ) : (
                // View Mode
                <div
                  className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
                  onClick={() => handleTaskClick(task)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <p className="text-slate-900">{task.description}</p>
                      </div>
                      {task.asset && (
                        <div className="ml-7 flex items-center space-x-2 text-sm text-slate-600">
                          <Package className="w-4 h-4" />
                          <span>{task.asset}</span>
                        </div>
                      )}
                    </div>

                    {/* More options */}
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMoreMenu(showMoreMenu === task.id ? null : task.id);
                        }}
                        className="p-1 hover:bg-slate-100 rounded transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-slate-400" />
                      </button>

                      {showMoreMenu === task.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setShowMoreMenu(null)}
                          ></div>
                          <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-20">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDuplicateTask(task.id);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                            >
                              <span>
                                <Copy className="w-4 h-4" />
                              </span>
                              <span>Duplicate</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTask(task.id);
                              }}
                              className="w-full px-4 py-2 text-left text-m text-red-600 hover:bg-red-50 flex items-center space-x-2"
                            >
                              <span>
                                <Trash className="w-4 h-4" />
                              </span>
                              <span>Delete</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add Task Form */}
          {showTaskInput && (
            <div className="bg-white border border-blue-300 rounded-lg p-4 shadow-sm">
              <div className="space-y-3">
                {/* Task description input */}
                <input
                  type="text"
                  placeholder="Enter task description"
                  value={currentTask.description}
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />

                {/* Asset selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowAssetDropdown(!showAssetDropdown)}
                    className="w-full flex items-center justify-between px-3 py-2 border border-slate-300 rounded-lg text-sm text-left hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-slate-400" />
                      <span className={currentTask.asset ? "text-slate-900" : "text-slate-400"}>
                        {currentTask.asset || "Select Asset (Optional)"}
                      </span>
                    </div>
                    <svg
                      className="w-4 h-4 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {showAssetDropdown && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowAssetDropdown(false)}
                      ></div>
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-20 max-h-48 overflow-y-auto">
                        <button
                          onClick={() => {
                            setCurrentTask({ ...currentTask, asset: "" });
                            setShowAssetDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-slate-400 hover:bg-slate-50"
                        >
                          No Asset
                        </button>
                        {assets.map((asset) => (
                          <button
                            key={asset.id}
                            onClick={() => {
                              setCurrentTask({ ...currentTask, asset: asset.name });
                              setShowAssetDropdown(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                          >
                            {asset.name}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => {
                      setShowTaskInput(false);
                      setCurrentTask({ description: "", asset: "" });
                    }}
                    className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTask}
                    disabled={!currentTask.description.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add Task Button */}
          {!showTaskInput && (
            <button
              onClick={() => setShowTaskInput(true)}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-blue-600 font-medium hover:border-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Task</span>
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-end space-x-3 pt-6 border-t border-slate-200">
          <button
            onClick={() => navigate("/checklists")}
            className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleCreateChecklist}
            disabled={!checklistName.trim() || isSubmitting}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Creating...</span>
              </>
            ) : (
              <span>Create Checklist</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}