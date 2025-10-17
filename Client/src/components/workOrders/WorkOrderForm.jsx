
//       className="p-6 space-y-8"
//       encType="multipart/form-data"
//     >
//       {/* -------------------- SECTION 1 -------------------- */}
//       <div>
//         <h2 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">
//           Work Order Details
//         </h2>

//         <div className="space-y-5">
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               Work Order Title <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               {...register("title")}
//               placeholder="Enter work order title"
//               className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 ${
//                 errors.title
//                   ? "border-red-400 focus:ring-red-500"
//                   : "border-slate-300 focus:ring-emerald-500"
//               }`}
//             />
//             {errors.title && (
//               <p className="text-xs text-red-500 mt-1">
//                 {errors.title.message}
//               </p>
//             )}
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               Description
//             </label>
//             <textarea
//               {...register("description")}
//               placeholder="Enter work order description"
//               rows={4}
//               className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 resize-none"
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               Category
//             </label>
//             <input
//               type="text"
//               {...register("category")}
//               placeholder="Enter category (e.g. Electrical, Mechanical)"
//               className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 ${
//                 errors.category
//                   ? "border-red-400 focus:ring-red-500"
//                   : "border-slate-300 focus:ring-emerald-500"
//               }`}
//             />
//             {errors.category && (
//               <p className="text-xs text-red-500 mt-1">
//                 {errors.category.message}
//               </p>
//             )}
//           </div>

//           {/* Priority */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               Priority
//             </label>
//             <select
//               {...register("priority")}
//               className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 bg-white"
//             >
//               <option>Low</option>
//               <option>Medium</option>
//               <option>High</option>
//             </select>
//           </div>

//           {/* Photos Upload */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               Photos
//             </label>
//             <div className="flex flex-col sm:flex-row items-center gap-3">
//               <input
//                 ref={photoInputRef}
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={(e) => handleFileChange(e, "photos")}
//                 className="hidden"
//               />
//               <button
//                 type="button"
//                 onClick={() => photoInputRef.current.click()}
//                 className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
//               >
//                 Upload Images
//               </button>
//               {photos?.length > 0 && (
//                 <p className="text-sm text-slate-600">
//                   {photos.length} file(s) selected
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* -------------------- SECTION 2 -------------------- */}
//       <div>
//         <h2 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">
//           Job Specification
//         </h2>

//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="text"
//             {...register("asset")}
//             placeholder="Asset name or ID"
//             className="border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500"
//           />
//           <input
//             type="text"
//             {...register("location")}
//             placeholder="Location"
//             className="border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500"
//           />
//           <input
//             type="date"
//             {...register("startDate")}
//             className="border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500"
//           />
//           <input
//             type="date"
//             {...register("dueDate")}
//             className="border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500"
//           />
//           <input
//             type="number"
//             step="0.5"
//             min="0"
//             {...register("duration", { valueAsNumber: true })}
//             placeholder="Duration (hours)"
//             className="border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500"
//           />
//         </div>
//       </div>

//       {/* -------------------- SECTION 3 -------------------- */}
//       <div>
//         <h2 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">
//           Assignee & Team
//         </h2>

//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="text"
//             {...register("primaryAssignee")}
//             placeholder="Primary Assignee"
//             className="border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500"
//           />
//           <input
//             type="text"
//             {...register("team")}
//             placeholder="Team"
//             className="border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500"
//           />
//           <input
//             type="text"
//             {...register("additionalAssignees")}
//             placeholder="Additional Assignees (comma separated)"
//             className="col-span-2 border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500"
//           />
//         </div>
//       </div>

//       {/* -------------------- SECTION 4 -------------------- */}
//       <div>
//         <h2 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">
//           Documents & Reference
//         </h2>

//         <div className="flex flex-col sm:flex-row items-center gap-3">
//           <input
//             ref={docInputRef}
//             type="file"
//             accept=".pdf,.txt,.docx"
//             multiple
//             onChange={(e) => handleFileChange(e, "documents")}
//             className="hidden"
//           />
//           <button
//             type="button"
//             onClick={() => docInputRef.current.click()}
//             className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
//           >
//             Upload Documents
//           </button>
//           {documents?.length > 0 && (
//             <p className="text-sm text-slate-600">
//               {documents.length} file(s) selected
//             </p>
//           )}
//         </div>
//       </div>

//       {/* -------------------- SECTION 5 -------------------- */}
//       <div>
//         <h2 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">
//           Signature Required
//         </h2>

//         <label className="flex items-center gap-3 cursor-pointer">
//           <input
//             type="checkbox"
//             {...register("signatureRequired")}
//             className="sr-only"
//           />
//           <div
//             className={`w-10 h-6 rounded-full p-1 transition ${
//               signatureRequired ? "bg-emerald-500" : "bg-slate-300"
//             }`}
//           >
//             <div
//               className={`w-4 h-4 bg-white rounded-full transition-transform ${
//                 signatureRequired ? "translate-x-4" : ""
//               }`}
//             ></div>
//           </div>
//           <span className="text-sm text-slate-700 font-medium">
//             Require signature before completion
//           </span>
//         </label>
//       </div>

//       {/* -------------------- SUBMIT -------------------- */}
//       <div className="pt-4 border-t">
//         <button
//           type="submit"
//           className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition"
//         >
//           Create Work Order
//         </button>
//       </div>
//     </form>
//   );
// }





//workOrderForm
import { useEffect, useCallback, forwardRef, useImperativeHandle} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDropzone } from "react-dropzone";


const getFileIcon = (file) => {
  const ext = file.name.split(".").pop().toLowerCase();
  if (ext === "pdf") return "📄";
  if (ext === "docx" || ext === "doc") return "📝";
  if (ext === "txt") return "📃";
  return "📁";
};

// ---------------- Schema ----------------
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
    .min(0, "Duration cannot be negative")
    .optional(),

  primaryAssignee: z.string().optional(),
  team: z.string().optional(),
  additionalAssignees: z.string().optional(),

  documents: z.any().optional(),
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
      documents: [],
      signatureRequired: false,
    },
  });

  const photos = watch("photos");
  const documents = watch("documents");
  const signatureRequired = watch("signatureRequired");

  // ---------------- Dropzone for Photos ----------------
  const onDropPhotos = useCallback(
    (acceptedFiles) => {
      setValue("photos", [...photos, ...acceptedFiles], { shouldValidate: true });
    },
    [photos, setValue]
  );

  const { getRootProps: getPhotoRootProps, getInputProps: getPhotoInputProps, isDragActive: isPhotoActive } =
    useDropzone({ onDrop: onDropPhotos, accept: { "image/*": [] }, multiple: true });

  // ---------------- Dropzone for Documents ----------------
  const onDropDocs = useCallback(
    (acceptedFiles) => {
      setValue("documents", [...documents, ...acceptedFiles], { shouldValidate: true });
    },
    [documents, setValue]
  );

  const { getRootProps: getDocRootProps, getInputProps: getDocInputProps, isDragActive: isDocActive } = useDropzone({
    onDrop: onDropDocs,
    accept: {
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
      "text/plain": [],
    },
    multiple: true,
  });

  // ---------------- Remove File Handlers ----------------
  const removePhoto = (index) => {
    setValue(
      "photos",
      photos.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  const removeDocument = (index) => {
    setValue(
      "documents",
      documents.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  // ---------------- Esc Key Close ----------------
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && onClose) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleFormSubmit = (data) => {
    console.log('Form data before submission:', data);
    try {
      const formattedData = {
        title: data.title,
        description: data.description || '',
        category: data.category || '',
        priority: data.priority || 'Low',
        status: 'Open',
        location: data.location || '',
        asset: data.asset || '',
        team: data.team || '',
        startDate: data.startDate || new Date().toISOString(),
        dueDate: data.dueDate || new Date().toISOString(),
        signatureRequired: data.signatureRequired || false,
      };
      console.log('Formatted data:', formattedData);
      onSubmit(formattedData);
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-8" encType="multipart/form-data">
      {/* ---------------- Work Order Details ---------------- */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">Work Order Details</h2>

        <div className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Work Order Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("title")}
              placeholder="Enter work order title"
              className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 ${
                errors.title ? "border-red-400 focus:ring-red-500" : "border-slate-300 focus:ring-emerald-500"
              }`}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
            <input
              type="text"
              {...register("category")}
              placeholder="Enter category (e.g. Electrical, Mechanical)"
              className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 ${
                errors.category ? "border-red-400 focus:ring-red-500" : "border-slate-300 focus:ring-emerald-500"
              }`}
            />
            {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Priority</label>
            <select
              {...register("priority")}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Photos Dropzone */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Photos</label>
            <div
              {...getPhotoRootProps()}
              className={`border-dashed border-2 rounded-lg p-6 text-center cursor-pointer transition ${
                isPhotoActive ? "border-emerald-500 bg-emerald-50" : "border-slate-300"
              }`}
            >
              <input {...getPhotoInputProps()} />
              {isPhotoActive ? <p>Drop images here...</p> : <p>Drag & drop images, or click to select files</p>}
            </div>

            {photos?.length > 0 && (
              <div className="flex overflow-x-auto mt-3 gap-3 py-2 scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200">
                {photos.map((file, idx) => (
                  <div key={idx} className="relative w-20 h-20 rounded overflow-hidden border flex-shrink-0">
                    <img src={URL.createObjectURL(file)} alt={file.name} className="object-cover w-full h-full" />
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- Documents Dropzone ---------------- */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">Documents & Reference</h2>
        <div
          {...getDocRootProps()}
          className={`border-dashed border-2 rounded-lg p-6 text-center cursor-pointer transition ${
            isDocActive ? "border-emerald-500 bg-emerald-50" : "border-slate-300"
          }`}
        >
          <input {...getDocInputProps()} />
          {isDocActive ? (
            <p>Drop documents here...</p>
          ) : (
            <p>Drag & drop documents (PDF, DOCX, TXT), or click to select files</p>
          )}
        </div>
        {documents?.length > 0 && (
          <div className="flex overflow-x-auto mt-3 gap-3 py-2 scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200">
            {documents.map((file, idx) => (
              <div
                key={idx}
                className="relative flex items-center justify-center w-20 h-20 border rounded-lg text-2xl font-bold text-slate-700 flex-shrink-0"
                title={file.name}
              >
                {getFileIcon(file)}
                <button
                  type="button"
                  onClick={() => removeDocument(idx)}
                  className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------------- Signature ---------------- */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">Signature Required</h2>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" {...register("signatureRequired")} className="sr-only" />
          <div
            className={`w-10 h-6 rounded-full p-1 transition ${signatureRequired ? "bg-emerald-500" : "bg-slate-300"}`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transition-transform ${
                signatureRequired ? "translate-x-4" : ""
              }`}
            ></div>
          </div>
          <span className="text-sm text-slate-700 font-medium">Require signature before completion</span>
        </label>
      </div>

      {/* ---------------- Submit ---------------- */}
      <div className="pt-4 border-t">
        <button
          type="submit"
          className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition"
          onclick = "handleFormSubmit()"
        >
          Create Work Order
        </button>
      </div>
    </form>
  );
}

