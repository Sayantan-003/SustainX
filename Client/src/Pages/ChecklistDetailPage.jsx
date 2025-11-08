import { ReactSVG } from "react-svg";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Edit2, 
  Trash2, 
  Plus, 
  Check, 
  X,
  MoreVertical,
  Save
} from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import {
  getChecklistById,
  updateChecklist,
  addTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
  deleteChecklist
} from "../api/Checklist";

import CloseIcon from "../assets/left_panel_close_icon.svg";
import OpenIcon from "../assets/left_panel_open_icon.svg";

export default function ChecklistDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  
  // Checklist state
  const [checklist, setChecklist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Edit states
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskData, setEditTaskData] = useState({ description: "", asset: "" });
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskData, setNewTaskData] = useState({ description: "", asset: "" });
  const [editingChecklistName, setEditingChecklistName] = useState(false);
  const [checklistName, setChecklistName] = useState("");
  const [editingSection, setEditingSection] = useState(false);
  const [sectionName, setSectionName] = useState("");

  // Fetch checklist data
  useEffect(() => {
    fetchChecklist();
  }, [id]);

  const fetchChecklist = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getChecklistById(id);

      if (response.ok) {
        setChecklist(response.data);
        setChecklistName(response.data.name);
        setSectionName(response.data.section || "");
      } else {
        setError(response.message || "Failed to fetch checklist");
      }
    } catch (err) {
      console.error("Error fetching checklist:", err);
      setError("An error occurred while fetching checklist");
    } finally {
      setLoading(false);
    }
  };

  // Handle checklist name update
  const handleUpdateChecklistName = async () => {
    if (!checklistName.trim()) {
      alert("Checklist name cannot be empty");
      return;
    }

    try {
      const response = await updateChecklist(id, { name: checklistName });
      if (response.ok) {
        setChecklist(response.data);
        setEditingChecklistName(false);
      } else {
        alert(response.message || "Failed to update checklist name");
      }
    } catch (err) {
      console.error("Error updating checklist name:", err);
      alert("An error occurred while updating checklist name");
    }
  };

  // Handle section update
  const handleUpdateSection = async () => {
    try {
      const response = await updateChecklist(id, { section: sectionName });
      if (response.ok) {
        setChecklist(response.data);
        setEditingSection(false);
      } else {
        alert(response.message || "Failed to update section");
      }
    } catch (err) {
      console.error("Error updating section:", err);
      alert("An error occurred while updating section");
    }
  };

  // Handle task toggle
  const handleToggleTask = async (taskId) => {
    try {
      const response = await toggleTaskCompletion(id, taskId);
      if (response.ok) {
        setChecklist(response.data);
      } else {
        alert(response.message || "Failed to toggle task");
      }
    } catch (err) {
      console.error("Error toggling task:", err);
      alert("An error occurred while toggling task");
    }
  };

  // Handle edit task
  const handleEditTask = (task) => {
    setEditingTaskId(task._id);
    setEditTaskData({
      description: task.description,
      asset: task.asset || ""
    });
  };

  // Handle save task edit
  const handleSaveTaskEdit = async () => {
    if (!editTaskData.description.trim()) {
      alert("Task description cannot be empty");
      return;
    }

    try {
      const response = await updateTask(id, editingTaskId, editTaskData);
      if (response.ok) {
        setChecklist(response.data);
        setEditingTaskId(null);
        setEditTaskData({ description: "", asset: "" });
      } else {
        alert(response.message || "Failed to update task");
      }
    } catch (err) {
      console.error("Error updating task:", err);
      alert("An error occurred while updating task");
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditTaskData({ description: "", asset: "" });
  };

  // Handle delete task
  const handleDeleteTask = async (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await deleteTask(id, taskId);
      if (response.ok) {
        setChecklist(response.data);
      } else {
        alert(response.message || "Failed to delete task");
      }
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("An error occurred while deleting task");
    }
  };

  // Handle add new task
  const handleAddTask = async () => {
    if (!newTaskData.description.trim()) {
      alert("Task description cannot be empty");
      return;
    }

    try {
      const response = await addTask(id, newTaskData);
      if (response.ok) {
        setChecklist(response.data);
        setNewTaskData({ description: "", asset: "" });
        setIsAddingTask(false);
      } else {
        alert(response.message || "Failed to add task");
      }
    } catch (err) {
      console.error("Error adding task:", err);
      alert("An error occurred while adding task");
    }
  };

  // Handle delete checklist
  const handleDeleteChecklist = async () => {
    if (!confirm("Are you sure you want to delete this checklist? This action cannot be undone.")) return;

    try {
      const response = await deleteChecklist(id);
      if (response.ok) {
        navigate("/checklists");
      } else {
        alert(response.message || "Failed to delete checklist");
      }
    } catch (err) {
      console.error("Error deleting checklist:", err);
      alert("An error occurred while deleting checklist");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-600">Loading checklist...</p>
        </div>
      </div>
    );
  }

  if (error || !checklist) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Checklist not found"}</p>
          <button
            onClick={() => navigate("/checklists")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Checklists
          </button>
        </div>
      </div>
    );
  }

  const completedTasks = checklist.tasks?.filter(task => task.isCompleted).length || 0;
  const totalTasks = checklist.tasks?.length || 0;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 w-64 flex-shrink-0
        ${sidebarIsOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar
          activeSection="checklists"
          onNavigate={(section) => {
            if (section === "checklists") navigate("/checklists");
            else if (section === "work-orders") navigate("/");
          }}
        />
      </div>

      {/* Overlay */}
      {sidebarIsOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarIsOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out min-w-0
        ${sidebarIsOpen ? "lg:ml-64" : "ml-0"}`}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                  className="p-2 rounded-md hover:bg-slate-100 border border-slate-200 transition"
                >
                  {sidebarIsOpen ? (
                    <ReactSVG
                      src={CloseIcon}
                      beforeInjection={(svg) => {
                        svg.classList.add("w-7", "h-7", "text-slate-700");
                      }}
                    />
                  ) : (
                    <ReactSVG
                      src={OpenIcon}
                      beforeInjection={(svg) => {
                        svg.classList.add("w-7", "h-7", "text-slate-700");
                      }}
                    />
                  )}
                </button>
                <button
                  onClick={() => navigate("/checklists")}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              <button
                onClick={handleDeleteChecklist}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Checklist
              </button>
            </div>

            {/* Checklist Name */}
            <div className="mb-2">
              {editingChecklistName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={checklistName}
                    onChange={(e) => setChecklistName(e.target.value)}
                    className="text-3xl font-bold text-slate-800 border-b-2 border-blue-600 focus:outline-none flex-1"
                    autoFocus
                  />
                  <button
                    onClick={handleUpdateChecklistName}
                    className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setChecklistName(checklist.name);
                      setEditingChecklistName(false);
                    }}
                    className="p-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-slate-800">{checklist.name}</h1>
                  <button
                    onClick={() => setEditingChecklistName(true)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              )}
            </div>

            {/* Section */}
            <div className="mb-4">
              {editingSection ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    placeholder="Enter section name"
                    className="text-sm text-slate-600 border-b border-slate-300 focus:outline-none focus:border-blue-600"
                    autoFocus
                  />
                  <button
                    onClick={handleUpdateSection}
                    className="p-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSectionName(checklist.section || "");
                      setEditingSection(false);
                    }}
                    className="p-1 bg-slate-600 text-white rounded hover:bg-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">
                    {checklist.section || "No section"}
                  </span>
                  <button
                    onClick={() => setEditingSection(true)}
                    className="p-1 hover:bg-slate-100 rounded transition-colors"
                  >
                    <Edit2 className="w-3 h-3 text-slate-600" />
                  </button>
                </div>
              )}
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                <span>{completedTasks} of {totalTasks} tasks completed</span>
                <span>{completionPercentage}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Status Badge */}
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              checklist.status === 'completed' ? 'bg-green-100 text-green-700' :
              checklist.status === 'archived' ? 'bg-gray-100 text-gray-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {checklist.status}
            </span>
          </div>

          {/* Tasks Section */}
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">Tasks</h2>
              <button
                onClick={() => setIsAddingTask(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>

            {/* Add New Task Form */}
            {isAddingTask && (
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Task description"
                    value={newTaskData.description}
                    onChange={(e) => setNewTaskData({ ...newTaskData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <input
                    type="text"
                    placeholder="Asset (optional)"
                    value={newTaskData.asset}
                    onChange={(e) => setNewTaskData({ ...newTaskData, asset: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddTask}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Task
                    </button>
                    <button
                      onClick={() => {
                        setIsAddingTask(false);
                        setNewTaskData({ description: "", asset: "" });
                      }}
                      className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Task List */}
            <div className="divide-y divide-slate-200">
              {checklist.tasks && checklist.tasks.length > 0 ? (
                checklist.tasks.map((task) => (
                  <div
                    key={task._id}
                    className="px-6 py-4 hover:bg-slate-50 transition-colors"
                  >
                    {editingTaskId === task._id ? (
                      // Edit Mode
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editTaskData.description}
                          onChange={(e) => setEditTaskData({ ...editTaskData, description: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                        <input
                          type="text"
                          placeholder="Asset (optional)"
                          value={editTaskData.asset}
                          onChange={(e) => setEditTaskData({ ...editTaskData, asset: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveTaskEdit}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                          >
                            <Save className="w-4 h-4" />
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={task.isCompleted}
                            onChange={() => handleToggleTask(task._id)}
                            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                          <div className="flex-1">
                            <p className={`text-sm ${task.isCompleted ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                              {task.description}
                            </p>
                            {task.asset && (
                              <p className="text-xs text-slate-500 mt-1">Asset: {task.asset}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditTask(task)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-slate-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task._id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-6 py-12 text-center text-slate-500">
                  <p>No tasks yet. Add your first task to get started!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}