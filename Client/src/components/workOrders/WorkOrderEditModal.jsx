const API_URL = import.meta.env.VITE_API_URL;


import { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Flag,
  Package,
  MapPin,
  Users,
  FileText,
  Image as ImageIcon,
  Upload,
  Trash2,
  Plus,
  Loader2,
  User,
  Building2,
  Clock,
  CheckSquare,
  AlertCircle,
} from "lucide-react";


export default function WorkOrderEditModal({ workOrder, onClose, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Low",
    status: "Open",
    asset: "",
    location: "",
    startDate: "",
    dueDate: "",
    duration: 0,
    primaryAssignee: "",
    team: "",
    additionalAssignees: "",
    signatureRequired: false,
    checklists: [],
  });
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);
  const [photosToDelete, setPhotosToDelete] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  // Initialize form data from workOrder
  useEffect(() => {
    if (workOrder) {
      setFormData({
        title: workOrder.title || "",
        description: workOrder.description || "",
        category: workOrder.category || "",
        priority: workOrder.priority || "Low",
        status: workOrder.status || "Open",
        asset: workOrder.asset || "",
        location: workOrder.location || "",
        startDate: workOrder.startDate ? new Date(workOrder.startDate).toISOString().split("T")[0] : "",
        dueDate: workOrder.dueDate ? new Date(workOrder.dueDate).toISOString().split("T")[0] : "",
        duration: workOrder.duration || 0,
        primaryAssignee: workOrder.primaryAssignee || "",
        team: workOrder.team || "",
        additionalAssignees: workOrder.additionalAssignees || "",
        signatureRequired: workOrder.signatureRequired || false,
        checklists: workOrder.checklists || [],
      });
      setExistingPhotos(workOrder.photos || []);
    }
  }, [workOrder]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle new photo selection
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setNewPhotos((prev) => [...prev, ...files]);
      
      // Create preview URLs
      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...urls]);
    }
  };

  // Remove new photo (not yet uploaded)
  const removeNewPhoto = (index) => {
    setNewPhotos((prev) => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // Mark existing photo for deletion
  const markPhotoForDeletion = (photoId) => {
    setPhotosToDelete((prev) => [...prev, photoId]);
    setExistingPhotos((prev) => prev.filter((photo) => photo._id !== photoId));
  };

  // Add new checklist
  const addChecklist = () => {
    const newChecklist = {
      id: Date.now(),
      name: "",
      isExpanded: true,
      tasks: [],
    };
    setFormData((prev) => ({
      ...prev,
      checklists: [...prev.checklists, newChecklist],
    }));
  };

  // Remove checklist
  const removeChecklist = (checklistId) => {
    setFormData((prev) => ({
      ...prev,
      checklists: prev.checklists.filter((cl) => cl.id !== checklistId),
    }));
  };

  // Update checklist name
  const updateChecklistName = (checklistId, name) => {
    setFormData((prev) => ({
      ...prev,
      checklists: prev.checklists.map((cl) =>
        cl.id === checklistId ? { ...cl, name } : cl
      ),
    }));
  };

  // Add task to checklist
  const addTask = (checklistId) => {
    setFormData((prev) => ({
      ...prev,
      checklists: prev.checklists.map((cl) =>
        cl.id === checklistId
          ? {
              ...cl,
              tasks: [
                ...cl.tasks,
                {
                  id: Date.now(),
                  name: "",
                  status: "Not Started",
                  asset: "",
                  user: "",
                },
              ],
            }
          : cl
      ),
    }));
  };

  // Remove task from checklist
  const removeTask = (checklistId, taskId) => {
    setFormData((prev) => ({
      ...prev,
      checklists: prev.checklists.map((cl) =>
        cl.id === checklistId
          ? { ...cl, tasks: cl.tasks.filter((t) => t.id !== taskId) }
          : cl
      ),
    }));
  };

  // Update task
  const updateTask = (checklistId, taskId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      checklists: prev.checklists.map((cl) =>
        cl.id === checklistId
          ? {
              ...cl,
              tasks: cl.tasks.map((t) =>
                t.id === taskId ? { ...t, [field]: value } : t
              ),
            }
          : cl
      ),
    }));
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const formDataToSend = new FormData();

  //     // Append basic fields
  //     Object.keys(formData).forEach((key) => {
  //       if (key === "checklists") {
  //         formDataToSend.append(key, JSON.stringify(formData[key]));
  //       } else {
  //         formDataToSend.append(key, formData[key]);
  //       }
  //     });

  //     // Append existing photos (excluding deleted ones)
  //     formDataToSend.append("photos", JSON.stringify(existingPhotos));

  //     // Append new photos
  //     newPhotos.forEach((photo) => {
  //       formDataToSend.append("photos", photo);
  //     });

  //     // Update work order
  //     const response = await fetch(`${API_URL}/workorders/${workOrder.id}`, {
  //       method: "PUT",
  //       body: formDataToSend,
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to update work order");
  //     }

  //     const result = await response.json();

  //     // Delete marked photos
  //     for (const photoId of photosToDelete) {
  //       try {
  //         await fetch(`${API_URL}/workorders/${workOrder.id}/photos/${photoId}`, {
  //           method: "DELETE",
  //         });
  //       } catch (err) {
  //         console.error("Error deleting photo:", err);
  //       }
  //     }

  //     onUpdate(result.data);
  //     onClose();
  //   } catch (error) {
  //     console.error("Error updating work order:", error);
  //     alert("Failed to update work order. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // In WorkOrderEditModal.jsx, update the handleSubmit function:

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formDataToSend = new FormData();

    // Append basic fields
    Object.keys(formData).forEach((key) => {
      if (key === "checklists") {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    // IMPORTANT: Send existing photos as 'existingPhotos' not 'photos'
    formDataToSend.append("existingPhotos", JSON.stringify(existingPhotos));

    // Append new photos
    newPhotos.forEach((photo) => {
      formDataToSend.append("photos", photo);
    });

    const token = localStorage.getItem("accessToken");
    const API_BASE = import.meta.env.VITE_API_BASE;

    // Update work order
    const response = await fetch(`${API_BASE}/api/workorders/${workOrder.id}`, {
      method: "PUT",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
      body: formDataToSend,
    });

    if (!response.ok) {
      throw new Error("Failed to update work order");
    }

    const result = await response.json();

    // Delete marked photos
    for (const photoId of photosToDelete) {
      try {
        await fetch(`${API_BASE}/api/workorders/${workOrder.id}/photos/${photoId}`, {
          method: "DELETE",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: "include",
        });
      } catch (err) {
        console.error("Error deleting photo:", err);
      }
    }

    onUpdate(result.data);
    onClose();
  } catch (error) {
    console.error("Error updating work order:", error);
    alert("Failed to update work order. Please try again.");
  } finally {
    setLoading(false);
  }
};

  if (!workOrder) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white text-black px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Edit Work Order</h2>
              <p className="text-blue-500 text-sm mt-1">WO #{workOrder.id.substring(workOrder.id.length - 6)}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter work order title"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Enter description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Electrical, Plumbing"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Location & Asset */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Location & Asset
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Building A - Floor 3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Asset
                  </label>
                  <input
                    type="text"
                    name="asset"
                    value={formData.asset}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., HVAC Unit #5"
                  />
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Schedule
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Duration (hours)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    min="0"
                    step="0.5"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Assignment */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Assignment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Primary Assignee
                  </label>
                  <input
                    type="text"
                    name="primaryAssignee"
                    value={formData.primaryAssignee}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Assign to"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Team
                  </label>
                  <input
                    type="text"
                    name="team"
                    value={formData.team}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Team name"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Additional Assignees
                  </label>
                  <input
                    type="text"
                    name="additionalAssignees"
                    value={formData.additionalAssignees}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Comma-separated names"
                  />
                </div>
              </div>
            </div>

            {/* Photos */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                Photos
              </h3>
              
              {/* Existing Photos */}
              {existingPhotos.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-slate-600 mb-2">Current Photos</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {existingPhotos.map((photo) => (
                      <div key={photo._id} className="relative group">
                        <img
                          src={photo.url}
                          alt="Work order"
                          className="w-full h-24 object-cover rounded-lg border-2 border-slate-200"
                        />
                        <button
                          type="button"
                          onClick={() => markPhotoForDeletion(photo._id)}
                          className="absolute top-1 right-1 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Photos Preview */}
              {previewUrls.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-slate-600 mb-2">New Photos</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt="New"
                          className="w-full h-24 object-cover rounded-lg border-2 border-blue-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewPhoto(index)}
                          className="absolute top-1 right-1 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                <Upload className="w-5 h-5 text-slate-400" />
                <span className="text-sm text-slate-600">Add Photos</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Checklists */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-blue-600" />
                  Checklists
                </h3>
                <button
                  type="button"
                  onClick={addChecklist}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Checklist
                </button>
              </div>

              <div className="space-y-4">
                {formData.checklists.map((checklist) => (
                  <div key={checklist.id} className="bg-white rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <input
                        type="text"
                        value={checklist.name}
                        onChange={(e) => updateChecklistName(checklist.id, e.target.value)}
                        placeholder="Checklist name"
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => removeChecklist(checklist.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {checklist.tasks.map((task) => (
                        <div key={task.id} className="flex items-center gap-2 bg-slate-50 p-2 rounded">
                          <input
                            type="text"
                            value={task.name}
                            onChange={(e) => updateTask(checklist.id, task.id, "name", e.target.value)}
                            placeholder="Task name"
                            className="flex-1 px-2 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <select
                            value={task.status}
                            onChange={(e) => updateTask(checklist.id, task.id, "status", e.target.value)}
                            className="px-2 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => removeTask(checklist.id, task.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => addTask(checklist.id)}
                      className="mt-2 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add Task
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="signatureRequired"
                  checked={formData.signatureRequired}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">
                  Require signature upon completion
                </span>
              </label>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-4 bg-slate-50">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Work Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}