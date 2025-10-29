// import { useEffect, useCallback, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useDropzone } from "react-dropzone";
// import { GripVertical, Trash2, Plus, ChevronDown, Upload, X, CheckCircle2, AlertCircle, Calendar, User, Briefcase, MapPin, Clock } from "lucide-react";

// // ---------------- Schema ----------------
// const workOrderSchema = z.object({
//   title: z.string().min(3, "Title must be at least 3 characters"),
//   description: z.string().optional(),
//   category: z.string().min(2, "Category is required"),
//   priority: z.enum(["Low", "Medium", "High"]),
//   photos: z.any().optional(),
//   asset: z.string().optional(),
//   location: z.string().optional(),
//   startDate: z.string().optional(),
//   dueDate: z.string().optional(),
//   duration: z
//     .number({ invalid_type_error: "Duration must be a number" })
//     .min(0, "Duration cannot be negative")
//     .optional(),
//   primaryAssignee: z.string().optional(),
//   team: z.string().optional(),
//   additionalAssignees: z.string().optional(),
//   signatureRequired: z.boolean().optional(),
// });

// export default function WorkOrderForm({ onSubmit, onClose }) {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(workOrderSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       category: "",
//       priority: "Low",
//       photos: [],
//       asset: "",
//       location: "",
//       startDate: "",
//       dueDate: "",
//       duration: "",
//       primaryAssignee: "",
//       team: "",
//       additionalAssignees: "",
//       signatureRequired: false,
//     },
//   });

//   const photos = watch("photos");
//   const signatureRequired = watch("signatureRequired");
//   const priority = watch("priority");

//   // ---------------- Tasks & Checklists State ----------------
//   const [checklists, setChecklists] = useState([
//     {
//       id: 1,
//       name: "Other Tasks",
//       isExpanded: true,
//       tasks: [
//         {
//           id: 1,
//           name: "",
//           status: "Not Started",
//           asset: "",
//           user: "",
//         },
//       ],
//     },
//   ]);

//   const [isSubmitted, setIsSubmitted] = useState(false);

//   // ---------------- Dropzone for Photos ----------------
//   const onDropPhotos = useCallback(
//     (acceptedFiles) => {
//       setValue("photos", [...photos, ...acceptedFiles], { shouldValidate: true });
//     },
//     [photos, setValue]
//   );

//   const { getRootProps: getPhotoRootProps, getInputProps: getPhotoInputProps, isDragActive: isPhotoActive } =
//     useDropzone({ onDrop: onDropPhotos, accept: { "image/*": [] }, multiple: true });

//   const removePhoto = (index) => {
//     setValue(
//       "photos",
//       photos.filter((_, i) => i !== index),
//       { shouldValidate: true }
//     );
//   };

//   // ---------------- Checklist Functions ----------------
//   const addChecklist = () => {
//     const newId = Math.max(...checklists.map((c) => c.id), 0) + 1;
//     setChecklists([
//       ...checklists,
//       {
//         id: newId,
//         name: "New Checklist",
//         isExpanded: true,
//         tasks: [],
//       },
//     ]);
//   };

//   const removeChecklist = (checklistId) => {
//     setChecklists(checklists.filter((c) => c.id !== checklistId));
//   };

//   const toggleChecklist = (checklistId) => {
//     setChecklists(
//       checklists.map((c) =>
//         c.id === checklistId ? { ...c, isExpanded: !c.isExpanded } : c
//       )
//     );
//   };

//   const updateChecklistName = (checklistId, name) => {
//     setChecklists(
//       checklists.map((c) => (c.id === checklistId ? { ...c, name } : c))
//     );
//   };

//   // ---------------- Task Functions ----------------
//   const addTask = (checklistId) => {
//     if (checklists.length === 0) {
//       const newChecklist = {
//         id: 1,
//         name: "Other Tasks",
//         isExpanded: true,
//         tasks: [
//           {
//             id: 1,
//             name: "",
//             status: "Not Started",
//             asset: "",
//             user: "",
//           },
//         ],
//       };
//       setChecklists([newChecklist]);
//       return;
//     }

//     setChecklists(
//       checklists.map((checklist) => {
//         if (checklist.id === checklistId) {
//           const newTaskId =
//             Math.max(...checklist.tasks.map((t) => t.id), 0) + 1;
//           return {
//             ...checklist,
//             tasks: [
//               ...checklist.tasks,
//               {
//                 id: newTaskId,
//                 name: "",
//                 status: "Not Started",
//                 asset: "",
//                 user: "",
//               },
//             ],
//           };
//         }
//         return checklist;
//       })
//     );
//   };

//   const removeTask = (checklistId, taskId) => {
//     setChecklists(
//       checklists.map((checklist) => {
//         if (checklist.id === checklistId) {
//           return {
//             ...checklist,
//             tasks: checklist.tasks.filter((t) => t.id !== taskId),
//           };
//         }
//         return checklist;
//       })
//     );
//   };

//   const updateTask = (checklistId, taskId, field, value) => {
//     setChecklists(
//       checklists.map((checklist) => {
//         if (checklist.id === checklistId) {
//           return {
//             ...checklist,
//             tasks: checklist.tasks.map((task) =>
//               task.id === taskId ? { ...task, [field]: value } : task
//             ),
//           };
//         }
//         return checklist;
//       })
//     );
//   };

//   const handleFormSubmit = (data) => {
//     try {
//       const formattedData = {
//         title: data.title,
//         description: data.description || "",
//         category: data.category || "",
//         priority: data.priority || "Low",
//         status: "Open",
//         location: data.location || "",
//         asset: data.asset || "",
//         team: data.team || "",
//         startDate: data.startDate || new Date().toISOString(),
//         dueDate: data.dueDate || new Date().toISOString(),
//         signatureRequired: data.signatureRequired || false,
//         checklists: checklists,
//       };
//       console.log("Work Order Created:", formattedData);
//       setIsSubmitted(true);
//       setTimeout(() => setIsSubmitted(false), 3000);
//     } catch (error) {
//       console.error("Error in form submission:", error);
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch(priority) {
//       case "High": return "bg-red-50 border-red-200 text-red-700";
//       case "Medium": return "bg-amber-50 border-amber-200 text-amber-700";
//       default: return "bg-emerald-50 border-emerald-200 text-emerald-700";
//     }
//   };

//   const getStatusColor = (status) => {
//     switch(status) {
//       case "Completed": return "bg-emerald-100 text-emerald-800 border-emerald-300";
//       case "In Progress": return "bg-blue-100 text-blue-800 border-blue-300";
//       default: return "bg-slate-100 text-slate-700 border-slate-300";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
//       <div className="max-w-5xl mx-auto p-8">
//         {/* Success Message */}
//         {isSubmitted && (
//           <div className="mb-6 bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
//             <CheckCircle2 className="w-6 h-6 text-emerald-600" />
//             <p className="text-emerald-800 font-medium">Work order created successfully!</p>
//           </div>
//         )}

//         {/* Header
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
//           <div className="flex items-start justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Work Order</h1>
//               <p className="text-slate-600">Fill in the details to create a new work order</p>
//             </div>
//           </div>
//         </div> */}

//         <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
//           {/* Work Order Details */}
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
//                 <Briefcase className="w-5 h-5 text-white" />
//               </div>
//               <h2 className="text-xl font-bold text-slate-900">Work Order Details</h2>
//             </div>

//             <div className="space-y-6">
//               {/* Title */}
//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   Work Order Title <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   {...register("title")}
//                   placeholder="e.g., Repair HVAC system in Building A"
//                   className={`w-full border-2 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 transition-all ${
//                     errors.title
//                       ? "border-red-300 focus:border-red-500 focus:ring-red-100"
//                       : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
//                   }`}
//                 />
//                 {errors.title && (
//                   <div className="flex items-center gap-2 mt-2 text-red-600">
//                     <AlertCircle className="w-4 h-4" />
//                     <p className="text-sm">{errors.title.message}</p>
//                   </div>
//                 )}
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   Description
//                 </label>
//                 <textarea
//                   {...register("description")}
//                   placeholder="Provide detailed information about the work order..."
//                   rows={4}
//                   className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
//                 />
//               </div>

//               {/* Category & Priority Row */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Category */}
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Category <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     {...register("category")}
//                     className={`w-full border-2 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-4 transition-all appearance-none bg-white ${
//                       errors.category
//                         ? "border-red-300 focus:border-red-500 focus:ring-red-100"
//                         : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
//                     }`}
//                   >
//                     <option value="">Select Category</option>
//                     <option value="Electrical">⚡ Electrical</option>
//                     <option value="Mechanical">⚙️ Mechanical</option>
//                     {/* <option value="Plumbing">🚰 Plumbing</option>
//                     <option value="HVAC">❄️ HVAC</option>
//                     <option value="General">🔧 General Maintenance</option> */}
//                     <option value="Other">📋 Other</option>
//                   </select>

//                   {watch("category") === "Other" && (
//                     <input
//                       type="text"
//                       placeholder="Enter custom category"
//                       onChange={(e) => setValue("category", e.target.value)}
//                       className="w-full mt-3 border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
//                     />
//                   )}

//                   {errors.category && (
//                     <div className="flex items-center gap-2 mt-2 text-red-600">
//                       <AlertCircle className="w-4 h-4" />
//                       <p className="text-sm">{errors.category.message}</p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Priority */}
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Priority Level
//                   </label>
//                   <div className="relative">
//                     <select
//                       {...register("priority")}
//                       className={`w-full border-2 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-4 transition-all appearance-none ${getPriorityColor(priority)}`}
//                     >
//                       <option value="Low">Low Priority</option>
//                       <option value="Medium">Medium Priority</option>
//                       <option value="High">High Priority</option>
//                     </select>
//                     <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none ${
//                       priority === "High" ? "bg-red-500" : priority === "Medium" ? "bg-amber-500" : "bg-emerald-500"
//                     }`} style={{left: 'auto', right: '16px'}}></div>
//                   </div>
//                 </div>
//               </div>

//               {/* Location & Asset Row */}
//               {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     <MapPin className="w-4 h-4 inline mr-1" />
//                     Location
//                   </label>
//                   <input
//                     type="text"
//                     {...register("location")}
//                     placeholder="e.g., Building A, Floor 2"
//                     className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     <Briefcase className="w-4 h-4 inline mr-1" />
//                     Asset
//                   </label>
//                   <input
//                     type="text"
//                     {...register("asset")}
//                     placeholder="e.g., HVAC Unit #123"
//                     className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
//                   />
//                 </div>
//               </div> */}

//               {/* Date Range & Duration */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     <Calendar className="w-4 h-4 inline mr-1" />
//                     Start Date
//                   </label>
//                   <input
//                     type="date"
//                     {...register("startDate")}
//                     className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     <Calendar className="w-4 h-4 inline mr-1" />
//                     Due Date
//                   </label>
//                   <input
//                     type="date"
//                     {...register("dueDate")}
//                     className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     <Clock className="w-4 h-4 inline mr-1" />
//                     Duration (hours)
//                   </label>
//                   <input
//                     type="number"
//                     {...register("duration", { valueAsNumber: true })}
//                     placeholder="0"
//                     className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
//                   />
//                 </div>
//               </div>

//               {/* Photos Upload */}
//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   <Upload className="w-4 h-4 inline mr-1" />
//                   Attachments
//                 </label>
//                 <div
//                   {...getPhotoRootProps()}
//                   className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
//                     isPhotoActive
//                       ? "border-blue-400 bg-blue-50"
//                       : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
//                   }`}
//                 >
//                   <input {...getPhotoInputProps()} />
//                   <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
//                   {isPhotoActive ? (
//                     <p className="text-blue-600 font-medium">Drop images here...</p>
//                   ) : (
//                     <>
//                       <p className="text-slate-700 font-medium mb-1">
//                         Drag & drop images, or click to browse
//                       </p>
//                       <p className="text-sm text-slate-500">
//                         PNG, JPG, GIF up to 10MB
//                       </p>
//                     </>
//                   )}
//                 </div>

//                 {photos?.length > 0 && (
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//                     {photos.map((file, idx) => (
//                       <div
//                         key={idx}
//                         className="relative group aspect-square rounded-xl overflow-hidden border-2 border-slate-200"
//                       >
//                         <img
//                           src={URL.createObjectURL(file)}
//                           alt={file.name}
//                           className="object-cover w-full h-full"
//                         />
//                         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
//                           <button
//                             type="button"
//                             onClick={() => removePhoto(idx)}
//                             className="opacity-0 group-hover:opacity-100 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all"
//                           >
//                             <X className="w-5 h-5" />
//                           </button>
//                         </div>
//                         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                           <p className="text-white text-xs truncate">{file.name}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Tasks & Checklists */}
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
//                   <CheckCircle2 className="w-5 h-5 text-white" />
//                 </div>
//                 <h2 className="text-xl font-bold text-slate-900">Tasks & Checklists</h2>
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   type="button"
//                   onClick={() => addTask(checklists[0]?.id)}
//                   className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Add Task
//                 </button>
//                 <button
//                   type="button"
//                   onClick={addChecklist}
//                   className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Add Checklist
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-4">
//               {checklists.map((checklist) => (
//                 <div
//                   key={checklist.id}
//                   className="border-2 border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors"
//                 >
//                   {/* Checklist Header */}
//                   <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 flex items-center justify-between">
//                     <input
//                       type="text"
//                       value={checklist.name}
//                       onChange={(e) =>
//                         updateChecklistName(checklist.id, e.target.value)
//                       }
//                       className="text-base font-bold text-slate-800 bg-transparent border-none focus:outline-none flex-1 placeholder:text-slate-400"
//                       placeholder="Checklist Name"
//                     />
//                     <div className="flex items-center gap-3">
//                       <span className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-full">
//                         {checklist.tasks.length} {checklist.tasks.length === 1 ? 'task' : 'tasks'}
//                       </span>
//                       <button
//                         type="button"
//                         onClick={() => removeChecklist(checklist.id)}
//                         className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition-colors"
//                       >
//                         Remove
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => toggleChecklist(checklist.id)}
//                         className="text-slate-600 hover:text-slate-800 p-1 hover:bg-white rounded-lg transition-colors"
//                       >
//                         <ChevronDown
//                           className={`w-5 h-5 transition-transform ${
//                             checklist.isExpanded ? "rotate-180" : ""
//                           }`}
//                         />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Tasks */}
//                   {checklist.isExpanded && (
//                     <div className="p-4 space-y-3 bg-slate-50">
//                       {checklist.tasks.map((task) => (
//                         <div
//                           key={task.id}
//                           className="flex items-start gap-3 p-4 border-2 border-slate-200 rounded-xl bg-white hover:border-slate-300 transition-colors group"
//                         >
//                           <GripVertical className="w-5 h-5 text-slate-400 mt-3 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity" />
//                           <div className="flex-1 space-y-4">
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                               <div className="md:col-span-2">
//                                 <label className="block text-xs font-semibold text-slate-600 mb-2">
//                                   Task Name
//                                 </label>
//                                 <input
//                                   type="text"
//                                   value={task.name}
//                                   onChange={(e) =>
//                                     updateTask(
//                                       checklist.id,
//                                       task.id,
//                                       "name",
//                                       e.target.value
//                                     )
//                                   }
//                                   placeholder="Enter task name..."
//                                   className="w-full border-2 border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
//                                 />
//                               </div>
//                               <div>
//                                 <label className="block text-xs font-semibold text-slate-600 mb-2">
//                                   Status
//                                 </label>
//                                 <select
//                                   value={task.status}
//                                   onChange={(e) =>
//                                     updateTask(
//                                       checklist.id,
//                                       task.id,
//                                       "status",
//                                       e.target.value
//                                     )
//                                   }
//                                   className={`w-full border-2 rounded-lg px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-4 transition-all ${getStatusColor(task.status)}`}
//                                 >
//                                   <option>Not Started</option>
//                                   <option>In Progress</option>
//                                   <option>Completed</option>
//                                 </select>
//                               </div>
//                             </div>
//                             <div className="flex gap-3 items-center pt-2 border-t border-slate-100">
//                               <button
//                                 type="button"
//                                 className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2 px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors"
//                               >
//                                 <Briefcase className="w-4 h-4" />
//                                 Add Asset
//                               </button>
//                               <button
//                                 type="button"
//                                 className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2 px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors"
//                               >
//                                 <User className="w-4 h-4" />
//                                 Assign User
//                               </button>
//                               <div className="flex-1"></div>
//                               <button
//                                 type="button"
//                                 onClick={() => removeTask(checklist.id, task.id)}
//                                 className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}

//                       {/* Add Task Button */}
//                       <button
//                         type="button"
//                         onClick={() => addTask(checklist.id)}
//                         className="w-full py-4 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 font-medium hover:bg-blue-50 hover:border-blue-400 transition-all flex items-center justify-center gap-2"
//                       >
//                         <Plus className="w-5 h-5" />
//                         Add Task to {checklist.name}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Signature Section */}
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
//             <h2 className="text-xl font-bold text-slate-900 mb-6">Completion Requirements</h2>
//             <label className="flex items-center gap-4 cursor-pointer group p-4 hover:bg-slate-50 rounded-xl transition-colors">
//               <input type="checkbox" {...register("signatureRequired")} className="sr-only" />
//               <div
//                 className={`relative w-14 h-8 rounded-full p-1 transition-all ${
//                   signatureRequired ? "bg-gradient-to-r from-blue-500 to-blue-600" : "bg-slate-300"
//                 }`}
//               >
//                 <div
//                   className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
//                     signatureRequired ? "translate-x-6" : ""
//                   }`}
//                 ></div>
//               </div>
//               <div>
//                 <span className="text-sm font-semibold text-slate-700 block">Require Signature</span>
//                 <span className="text-xs text-slate-500">Technician must sign upon completion</span>
//               </div>
//             </label>
//           </div>

//           {/* Submit Button */}
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
//             <div className="flex gap-4">
//               <button
//                 type="submit"
//                 className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300"
//               >
//                 Create Work Order
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   if (confirm("Are you sure you want to cancel? All unsaved changes will be lost.")) {
//                     window.location.reload();
//                   }
//                 }}
//                 className="px-8 py-4 border-2 border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 transition-all"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import {
  GripVertical,
  Trash2,
  Plus,
  ChevronDown,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Calendar,
  User,
  Briefcase,
  MapPin,
  Clock,
} from "lucide-react";
import { createWorkOrder } from "../../api/WorkOrders";

// Schema
const workOrderSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  category: z.string().min(2, "Category is required"),
  priority: z.enum(["Low", "Medium", "High"]),
  photos: z.any().optional(),
  asset: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().optional(),
  dueDate: z.string().optional(),
  duration: z
    .number({ invalid_type_error: "Duration must be a number" })
    .min(0)
    .optional(),
  primaryAssignee: z.string().optional(),
  team: z.string().optional(),
  additionalAssignees: z.string().optional(),
  signatureRequired: z.boolean().optional(),
});

export default function WorkOrderForm({ onSubmit, onClose }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(workOrderSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      priority: "Low",
      photos: [],
      asset: "",
      location: "",
      startDate: "",
      dueDate: "",
      duration: "",
      primaryAssignee: "",
      team: "",
      additionalAssignees: "",
      signatureRequired: false,
    },
  });

  const photos = watch("photos");
  const signatureRequired = watch("signatureRequired");
  const priority = watch("priority");

  const [checklists, setChecklists] = useState([
    {
      id: 1,
      name: "Other Tasks",
      isExpanded: true,
      tasks: [{ id: 1, name: "", status: "Not Started", asset: "", user: "" }],
    },
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Dropzone
  const onDropPhotos = useCallback(
    (acceptedFiles) => {
      setValue("photos", [...photos, ...acceptedFiles], {
        shouldValidate: true,
      });
    },
    [photos, setValue]
  );

  const {
    getRootProps: getPhotoRootProps,
    getInputProps: getPhotoInputProps,
    isDragActive: isPhotoActive,
  } = useDropzone({
    onDrop: onDropPhotos,
    accept: { "image/*": [] },
    multiple: true,
  });

  const removePhoto = (index) => {
    setValue(
      "photos",
      photos.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  // Checklist functions
  const addChecklist = () => {
    const newId = Math.max(...checklists.map((c) => c.id), 0) + 1;
    setChecklists([
      ...checklists,
      { id: newId, name: "New Checklist", isExpanded: true, tasks: [] },
    ]);
  };

  const removeChecklist = (checklistId) => {
    setChecklists(checklists.filter((c) => c.id !== checklistId));
  };

  const toggleChecklist = (checklistId) => {
    setChecklists(
      checklists.map((c) =>
        c.id === checklistId ? { ...c, isExpanded: !c.isExpanded } : c
      )
    );
  };

  const updateChecklistName = (checklistId, name) => {
    setChecklists(
      checklists.map((c) => (c.id === checklistId ? { ...c, name } : c))
    );
  };

  // Task functions
  const addTask = (checklistId) => {
    if (checklists.length === 0) {
      setChecklists([
        {
          id: 1,
          name: "Other Tasks",
          isExpanded: true,
          tasks: [
            { id: 1, name: "", status: "Not Started", asset: "", user: "" },
          ],
        },
      ]);
      return;
    }
    setChecklists(
      checklists.map((checklist) => {
        if (checklist.id === checklistId) {
          const newTaskId =
            Math.max(...checklist.tasks.map((t) => t.id), 0) + 1;
          return {
            ...checklist,
            tasks: [
              ...checklist.tasks,
              {
                id: newTaskId,
                name: "",
                status: "Not Started",
                asset: "",
                user: "",
              },
            ],
          };
        }
        return checklist;
      })
    );
  };

  const removeTask = (checklistId, taskId) => {
    setChecklists(
      checklists.map((checklist) => {
        if (checklist.id === checklistId) {
          return {
            ...checklist,
            tasks: checklist.tasks.filter((t) => t.id !== taskId),
          };
        }
        return checklist;
      })
    );
  };

  const updateTask = (checklistId, taskId, field, value) => {
    setChecklists(
      checklists.map((checklist) => {
        if (checklist.id === checklistId) {
          return {
            ...checklist,
            tasks: checklist.tasks.map((task) =>
              task.id === taskId ? { ...task, [field]: value } : task
            ),
          };
        }
        return checklist;
      })
    );
  };

  // Form submission with API integration
  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();

      // Append text fields
      formData.append("title", data.title);
      formData.append("description", data.description || "");
      formData.append("category", data.category || "");
      formData.append("priority", data.priority || "Low");
      formData.append("status", "Open");
      formData.append("location", data.location || "");
      formData.append("asset", data.asset || "");
      formData.append("team", data.team || "");
      formData.append("startDate", data.startDate || new Date().toISOString());
      formData.append("dueDate", data.dueDate || new Date().toISOString());
      formData.append("duration", data.duration || 0);
      formData.append("primaryAssignee", data.primaryAssignee || "");
      formData.append("additionalAssignees", data.additionalAssignees || "");
      formData.append("signatureRequired", data.signatureRequired || false);

      // Append checklists as JSON string
      formData.append("checklists", JSON.stringify(checklists));

      // Append photos
      if (photos && photos.length > 0) {
        photos.forEach((photo) => {
          formData.append("photos", photo);
        });
      }

      const result = await createWorkOrder(formData);

      if (result.ok) {
        console.log("Work Order Created:", result.data);
        setIsSubmitted(true);

        if (result.success) {
          console.log("Work Order Created:", result.data);
          setIsSubmitted(true);
        }
        // parent call onSubmit when provided
        if (onSubmit) {
          onSubmit(result.data);
        }

        setTimeout(() => {
          setIsSubmitted(false);
          if (onClose) {
            onClose();
          }
        }, 2000);
      } else {
        setError(result.message || "Failed to create work order");
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      setError("Failed to create work order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-5xl mx-auto p-8">
        {/* Success Message */}
        {isSubmitted && (
          <div className="mb-6 bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <p className="text-emerald-800 font-medium">
              Work order created successfully!
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Work Order Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Work Order Details
              </h2>
            </div>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Work Order Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("title")}
                  placeholder="e.g., Repair HVAC system in Building A"
                  className={`w-full border-2 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 transition-all ${
                    errors.title
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />
                {errors.title && (
                  <div className="flex items-center gap-2 mt-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <p className="text-sm">{errors.title.message}</p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  placeholder="Provide detailed information about the work order..."
                  rows={4}
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
                />
              </div>

              {/* Category & Priority Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("category")}
                    className={`w-full border-2 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-4 transition-all appearance-none bg-white ${
                      errors.category
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  >
                    <option value="">Select Category</option>
                    <option value="Electrical">⚡ Electrical</option>
                    <option value="Mechanical">⚙️ Mechanical</option>
                    <option value="Other">📋 Other</option>
                  </select>
                  {errors.category && (
                    <div className="flex items-center gap-2 mt-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <p className="text-sm">{errors.category.message}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Priority Level
                  </label>
                  <div className="relative">
                    <select
                      {...register("priority")}
                      className={`w-full border-2 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-4 transition-all appearance-none ${getPriorityColor(
                        priority
                      )}`}
                    >
                      <option value="Low">Low Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="High">High Priority</option>
                    </select>
                    <div
                      className={`absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none ${
                        priority === "High"
                          ? "bg-red-500"
                          : priority === "Medium"
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Date Range & Duration */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    {...register("startDate")}
                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Due Date
                  </label>
                  <input
                    type="date"
                    {...register("dueDate")}
                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Duration (hours)
                  </label>
                  <input
                    type="number"
                    {...register("duration", { valueAsNumber: true })}
                    placeholder="0"
                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              {/* Photos Upload */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <Upload className="w-4 h-4 inline mr-1" />
                  Attachments
                </label>
                <div
                  {...getPhotoRootProps()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    isPhotoActive
                      ? "border-blue-400 bg-blue-50"
                      : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <input {...getPhotoInputProps()} />
                  <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  {isPhotoActive ? (
                    <p className="text-blue-600 font-medium">
                      Drop images here...
                    </p>
                  ) : (
                    <>
                      <p className="text-slate-700 font-medium mb-1">
                        Drag & drop images, or click to browse
                      </p>
                      <p className="text-sm text-slate-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </>
                  )}
                </div>

                {photos?.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {photos.map((file, idx) => (
                      <div
                        key={idx}
                        className="relative group aspect-square rounded-xl overflow-hidden border-2 border-slate-200"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removePhoto(idx)}
                            className="opacity-0 group-hover:opacity-100 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-xs truncate">
                            {file.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tasks & Checklists */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Tasks & Checklists
                </h2>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => addTask(checklists[0]?.id)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={addChecklist}
                  className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Checklist
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {checklists.map((checklist) => (
                <div
                  key={checklist.id}
                  className="border-2 border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors"
                >
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 flex items-center justify-between">
                    <input
                      type="text"
                      value={checklist.name}
                      onChange={(e) =>
                        updateChecklistName(checklist.id, e.target.value)
                      }
                      className="text-base font-bold text-slate-800 bg-transparent border-none focus:outline-none flex-1 placeholder:text-slate-400"
                      placeholder="Checklist Name"
                    />
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-full">
                        {checklist.tasks.length}{" "}
                        {checklist.tasks.length === 1 ? "task" : "tasks"}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeChecklist(checklist.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleChecklist(checklist.id)}
                        className="text-slate-600 hover:text-slate-800 p-1 hover:bg-white rounded-lg transition-colors"
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            checklist.isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {checklist.isExpanded && (
                    <div className="p-4 space-y-3 bg-slate-50">
                      {checklist.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-start gap-3 p-4 border-2 border-slate-200 rounded-xl bg-white hover:border-slate-300 transition-colors group"
                        >
                          <GripVertical className="w-5 h-5 text-slate-400 mt-3 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-slate-600 mb-2">
                                  Task Name
                                </label>
                                <input
                                  type="text"
                                  value={task.name}
                                  onChange={(e) =>
                                    updateTask(
                                      checklist.id,
                                      task.id,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter task name..."
                                  className="w-full border-2 border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-2">
                                  Status
                                </label>
                                <select
                                  value={task.status}
                                  onChange={(e) =>
                                    updateTask(
                                      checklist.id,
                                      task.id,
                                      "status",
                                      e.target.value
                                    )
                                  }
                                  className={`w-full border-2 rounded-lg px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-4 transition-all ${getStatusColor(
                                    task.status
                                  )}`}
                                >
                                  <option>Not Started</option>
                                  <option>In Progress</option>
                                  <option>Completed</option>
                                </select>
                              </div>
                            </div>
                            <div className="flex gap-3 items-center pt-2 border-t border-slate-100">
                              <button
                                type="button"
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2 px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Briefcase className="w-4 h-4" />
                                Add Asset
                              </button>
                              <button
                                type="button"
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2 px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <User className="w-4 h-4" />
                                Assign User
                              </button>
                              <div className="flex-1"></div>
                              <button
                                type="button"
                                onClick={() =>
                                  removeTask(checklist.id, task.id)
                                }
                                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => addTask(checklist.id)}
                        className="w-full py-4 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 font-medium hover:bg-blue-50 hover:border-blue-400 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus className="w-5 h-5" />
                        Add Task to {checklist.name}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Signature Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Completion Requirements
            </h2>
            <label className="flex items-center gap-4 cursor-pointer group p-4 hover:bg-slate-50 rounded-xl transition-colors">
              <input
                type="checkbox"
                {...register("signatureRequired")}
                className="sr-only"
              />
              <div
                className={`relative w-14 h-8 rounded-full p-1 transition-all ${
                  signatureRequired
                    ? "bg-gradient-to-r from-blue-500 to-blue-600"
                    : "bg-slate-300"
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    signatureRequired ? "translate-x-6" : ""
                  }`}
                ></div>
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-700 block">
                  Require Signature
                </span>
                <span className="text-xs text-slate-500">
                  Technician must sign upon completion
                </span>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 font-bold py-4 px-6 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all shadow-lg ${
                  isSubmitting
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-blue-200 hover:shadow-xl hover:shadow-blue-300"
                }`}
              >
                {isSubmitting ? "Creating..." : "Create Work Order"}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to cancel? All unsaved changes will be lost."
                    )
                  ) {
                    if (onClose) onClose();
                    else window.location.reload();
                  }
                }}
                disabled={isSubmitting}
                className="px-8 py-4 border-2 border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
