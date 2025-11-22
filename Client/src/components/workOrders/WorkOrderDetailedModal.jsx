//WorkOrderDetailedModal.jsx
import { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  Flag,
  Package,
  MapPin,
  Users,
  FileText,
  Image,
  CheckSquare,
  Edit2,
  Trash2,
  Download,
  Share2,
  MoreVertical,
  User,
  Building2,
  Timer,
  AlertCircle,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Settings,
} from "lucide-react";

import WorkOrderEditModal from "./WorkOrderEditModal";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatShortDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function WorkOrderDetailedModal({
  workOrder,
  onClose,
  onUpdate,
  // onDelete,
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  if (!workOrder) return null;

  const openLightbox = (index) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === workOrder.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === 0 ? workOrder.photos.length - 1 : prev - 1
    );
  };

  const getStatusColor = (status) => {
    const lower = status?.toLowerCase();
    switch (lower) {
      case "open":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "in progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed":
      case "closed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "on hold":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "bg-emerald-50 text-emerald-700";
      case "Medium":
        return "bg-amber-50 text-amber-700";
      case "High":
        return "bg-red-50 text-red-700";
      default:
        return "bg-slate-50 text-slate-700";
    }
  };

  const getTaskStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case "In Progress":
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <Circle className="w-4 h-4 text-slate-400" />;
    }
  };

  const handleStatusChange = (newStatus) => {
    const updatedWorkOrder = { ...workOrder, status: newStatus };
    onUpdate(updatedWorkOrder);
    setShowStatusDropdown(false);
  };

  const statusOptions = ["Open", "In Progress", "On Hold", "Closed"];

  const actionButtons = [
    { icon: DollarSign, label: "Add Cost", color: "hover:bg-green-50" },
    { icon: Settings, label: "Add Parts", color: "hover:bg-purple-50" },
    { icon: FileText, label: "Add Note", color: "hover:bg-amber-50" },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: FileText },
    {
      id: "tasks",
      label: "Tasks",
      icon: CheckSquare,
      count: workOrder.checklists?.reduce(
        (acc, cl) => acc + cl.tasks.length,
        0
      ),
    },
    {
      id: "photos",
      label: "Photos",
      icon: Image,
      count: workOrder.photos?.length,
    },
    { id: "activity", label: "Activity", icon: Clock },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-white text-black px-6 py-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">
                    WO #{workOrder.id.substring(workOrder.id.length - 6)}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      workOrder.status
                    )}`}
                  >
                    {workOrder.status}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-blue-60">
                  {workOrder.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative"
                >
                  <MoreVertical className="w-5 h-5" />
                  {showMoreMenu && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[160px] z-10">
                      <button
                        onClick={() => {
                          setShowMoreMenu(false);
                          setShowEditModal(true);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <Edit2 className="w-4 h-4" /> Edit
                      </button>

                      <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                        <Download className="w-4 h-4" /> Export PDF
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                        <Share2 className="w-4 h-4" /> Share
                      </button>
                      {/* <hr className="my-2" />
                      <button
                        onClick={() => onDelete?.(workOrder.id)}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button> */}
                    </div>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Bar - NEW SECTION */}
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Left: Status Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <Circle className="w-4 h-4 text-slate-400" />
                  <span className="font-medium text-sm">{workOrder.status}</span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${showStatusDropdown ? 'rotate-90' : ''}`} />
                </button>
                
                {showStatusDropdown && (
                  <div className="absolute left-0 top-full mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[200px] z-10 border border-slate-200">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 ${
                          workOrder.status === status ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${
                          status === 'Open' ? 'bg-amber-500' :
                          status === 'In Progress' ? 'bg-blue-500' :
                          status === 'On Hold' ? 'bg-orange-500' :
                          status === 'Completed' || status === 'Closed' ? 'bg-emerald-500' :
                          'bg-slate-500'
                        }`} />
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Action Buttons */}
              <div className="flex items-center gap-1">
                {actionButtons.map((action, index) => (
                  <div key={index} className="relative group">
                    <button
                      className={`p-2 rounded-lg transition-colors ${action.color}`}
                      title={action.label}
                    >
                      <action.icon className="w-5 h-5 text-slate-600" />
                    </button>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {action.label}
                    </div>
                  </div>
                ))}
                <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200 bg-slate-50">
            <div className="flex gap-1 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors relative ${
                      activeTab === tab.id
                        ? "text-blue-600 bg-white"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {tab.count !== undefined && (
                      <span className="ml-1 px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-600 font-medium">
                          Start Date
                        </p>
                        <p className="text-sm font-semibold text-blue-900">
                          {formatShortDate(workOrder.startDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-purple-600 font-medium">
                          Due Date
                        </p>
                        <p className="text-sm font-semibold text-purple-900">
                          {formatShortDate(workOrder.dueDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <Timer className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs text-amber-600 font-medium">
                          Duration
                        </p>
                        <p className="text-sm font-semibold text-amber-900">
                          {workOrder.duration || 0} hours
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`rounded-xl p-4 border ${getPriorityColor(
                      workOrder.priority
                    )}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          workOrder.priority === "High"
                            ? "bg-red-100"
                            : workOrder.priority === "Medium"
                            ? "bg-amber-100"
                            : "bg-emerald-100"
                        }`}
                      >
                        <Flag className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium">Priority</p>
                        <p className="text-sm font-semibold">
                          {workOrder.priority}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {workOrder.description && (
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Description
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {workOrder.description}
                    </p>
                  </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Location & Asset */}
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-600" />
                        Location & Asset
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-slate-500">Location</p>
                            <p className="text-sm font-medium text-slate-800">
                              {workOrder.location || "Not specified"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Package className="w-4 h-4 text-slate-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-slate-500">Asset</p>
                            <p className="text-sm font-medium text-slate-800">
                              {workOrder.asset || "Not specified"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Building2 className="w-4 h-4 text-slate-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-slate-500">Category</p>
                            <p className="text-sm font-medium text-slate-800">
                              {workOrder.category || "Not specified"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Assignment */}
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-600" />
                        Assignment & Team
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <User className="w-4 h-4 text-indigo-500 mt-0.5" />
                          <div>
                            <p className="text-xs text-slate-500">
                              Primary Assignee
                            </p>
                            <p className="text-sm font-medium text-slate-800">
                              {workOrder.primaryAssignee || "Unassigned"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Building2 className="w-4 h-4 text-indigo-500 mt-0.5" />
                          <div>
                            <p className="text-xs text-slate-500">Team</p>
                            <p className="text-sm font-medium text-slate-800">
                              {workOrder.team || "No team assigned"}
                            </p>
                          </div>
                        </div>
                        {workOrder.additionalAssignees && (
                          <div className="flex items-start gap-3">
                            <Users className="w-4 h-4 text-indigo-500 mt-0.5" />
                            <div>
                              <p className="text-xs text-slate-500">
                                Additional Assignees
                              </p>
                              <p className="text-sm font-medium text-slate-800">
                                {workOrder.additionalAssignees}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Signature Required */}
                {workOrder.signatureRequired && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <p className="text-sm text-amber-800 font-medium">
                      Signature required upon completion
                    </p>
                  </div>
                )}

                {/* Timestamps */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
                    <div>
                      <span className="font-medium">Created:</span>{" "}
                      {formatDate(workOrder.createdAt)}
                    </div>
                    <div>
                      <span className="font-medium">Last Updated:</span>{" "}
                      {formatDate(workOrder.updatedAt)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tasks" && (
              <div className="space-y-4">
                {workOrder.checklists && workOrder.checklists.length > 0 ? (
                  workOrder.checklists.map((checklist) => (
                    <div
                      key={checklist.id}
                      className="bg-white rounded-xl border border-slate-200 overflow-hidden"
                    >
                      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                        <h4 className="font-semibold text-slate-800">
                          {checklist.name}
                        </h4>
                      </div>
                      <div className="p-4 space-y-2">
                        {checklist.tasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            {getTaskStatusIcon(task.status)}
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-800">
                                {task.name || "Unnamed task"}
                              </p>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-xs text-slate-500">
                                  Status: {task.status}
                                </span>
                                {task.asset && (
                                  <span className="text-xs text-slate-500">
                                    Asset: {task.asset}
                                  </span>
                                )}
                                {task.user && (
                                  <span className="text-xs text-slate-500">
                                    User: {task.user}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <CheckSquare className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p>No tasks added yet</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "photos" && (
              <div>
                {workOrder.photos && workOrder.photos.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {workOrder.photos.map((photo, index) => (
                      <div
                        key={photo._id || index}
                        onClick={() => openLightbox(index)}
                        className="aspect-square rounded-xl overflow-hidden border-2 border-slate-200 hover:border-blue-400 transition-colors cursor-pointer group relative"
                      >
                        <img
                          src={photo.url}
                          alt={`Work order photo ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <Image className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <Image className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p>No photos attached</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "activity" && (
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-xl p-8 text-center text-slate-500">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p>Activity timeline coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo Lightbox */}
      {lightboxOpen && workOrder.photos && workOrder.photos.length > 0 && (
        <div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {workOrder.photos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevPhoto();
                }}
                className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextPhoto();
                }}
                className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          <div
            className="max-w-6xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={workOrder.photos[currentPhotoIndex].url}
              alt={`Work order photo ${currentPhotoIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <p className="text-white text-sm font-medium">
              {currentPhotoIndex + 1} / {workOrder.photos.length}
            </p>
          </div>
        </div>
      )}
      
      {/* Edit Modal */}
      {showEditModal && (
        <WorkOrderEditModal
          workOrder={workOrder}
          onClose={() => setShowEditModal(false)}
          onUpdate={(updatedWO) => {
            setShowEditModal(false);
            onUpdate(updatedWO);
          }}
        />
      )}
    </>
  );
}