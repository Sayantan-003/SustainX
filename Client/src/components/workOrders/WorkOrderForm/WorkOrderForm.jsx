// //WorkOrderForm/WorkOrderForm.jsx:
// import { useState, useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useDropzone } from "react-dropzone";
// import { createWorkOrder } from "../../../api/WorkOrders";

// import WorkOrderDetails from "./WorkOrderDetails";
// import PhotoUploader from "./PhotoUploader";
// import ChecklistSection from "./ChecklistSection";
// import SignatureSection from "./SignatureSection";
// import SubmitForm from "./SubmitForm";
// import { CheckCircle2, AlertCircle } from "lucide-react";

// // Zod schema
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
//   duration: z.number({ invalid_type_error: "Duration must be a number" }).min(0).optional(),
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

//   const [checklists, setChecklists] = useState([
//     { id: 1, name: "Other Tasks", isExpanded: true, tasks: [{ id: 1, name: "", status: "Not Started" }] },
//   ]);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   const photos = watch("photos");

//   // Dropzone integration
//   const onDropPhotos = useCallback(
//     (acceptedFiles) => {
//       setValue("photos", [...photos, ...acceptedFiles], { shouldValidate: true });
//     },
//     [photos, setValue]
//   );

//   const handleFormSubmit = async (data) => {
//     setIsSubmitting(true);
//     setError("");

//     try {
//       const formData = new FormData();
//       for (const key in data) formData.append(key, data[key]);
//       formData.append("checklists", JSON.stringify(checklists));
//       if (photos) photos.forEach((p) => formData.append("photos", p));

//       const result = await createWorkOrder(formData);
//       if (result.ok) {
//         setIsSubmitted(true);
//         if (onSubmit) onSubmit(result.data);
//         setTimeout(() => {
//           setIsSubmitted(false);
//           onClose?.();
//         }, 2000);
//       } else {
//         setError(result.message || "Failed to create work order");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Error creating work order. Try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 pb-8">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 space-y-4 sm:space-y-6">
//         {isSubmitted && (
//           <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 shadow-sm">
//             <CheckCircle2 className="text-emerald-600 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
//             <p className="text-emerald-800 font-medium text-sm sm:text-base">
//               Work order created successfully!
//             </p>
//           </div>
//         )}
//         {error && (
//           <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 shadow-sm">
//             <AlertCircle className="text-red-600 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
//             <p className="text-red-800 font-medium text-sm sm:text-base break-words">
//               {error}
//             </p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 sm:space-y-6 relative">
//           <WorkOrderDetails register={register} errors={errors} watch={watch} />
//           <PhotoUploader {...{ photos, onDropPhotos, setValue }} />
//           <ChecklistSection {...{ checklists, setChecklists }} />
//           <SignatureSection register={register} watch={watch} />
//           <SubmitForm {...{ isSubmitting, onClose }} />
//         </form>
//       </div>
//     </div>
//   );
// }

//workOrderForm.jsx:
import { CheckCircle2, AlertCircle } from "lucide-react";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDropzone } from "react-dropzone";

//api call
import { createWorkOrder } from "../../../api/WorkOrders.js";

//form components
import WorkOrderDetails from "./WorkOrderDetails.jsx";
import PhotoUploader from "./PhotoUploader.jsx";
import AssignmentSection from "./AssignmentSection.jsx";
import ChecklistSection from "./ChecklistSection.jsx";
import SignatureSection from "./SignatureSection.jsx";
import SubmitForm from "./SubmitForm.jsx";

// Zod schema
const workOrderSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    customCategory: z.string().optional(),
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
  })
  .refine(
    (data) => {
      if (data.category === "Other") {
        return data.customCategory && data.customCategory.trim().length > 0;
      }
      return true;
    },
    {
      message: "Please specify a custom category",
      path: ["customCategory"],
    }
  );

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

  const [checklists, setChecklists] = useState([
    {
      id: 1,
      name: "Other Tasks",
      isExpanded: true,
      tasks: [{ id: 1, name: "", status: "Not Started" }],
    },
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const photos = watch("photos");

  // Dropzone integration
  const onDropPhotos = useCallback(
    (acceptedFiles) => {
      setValue("photos", [...photos, ...acceptedFiles], {
        shouldValidate: true,
      });
    },
    [photos, setValue]
  );

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      for (const key in data) formData.append(key, data[key]);
      formData.append("checklists", JSON.stringify(checklists));
      if (photos) photos.forEach((p) => formData.append("photos", p));

      const result = await createWorkOrder(formData);
      if (result.ok) {
        setIsSubmitted(true);
        if (onSubmit) onSubmit(result.data);
        setTimeout(() => {
          setIsSubmitted(false);
          onClose?.();
        }, 2000);
      } else {
        setError(result.message || "Failed to create work order");
      }
    } catch (err) {
      console.error(err);
      setError("Error creating work order. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 pb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 space-y-4 sm:space-y-6">
        {isSubmitted && (
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 shadow-sm">
            <CheckCircle2 className="text-emerald-600 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            <p className="text-emerald-800 font-medium text-sm sm:text-base">
              Work order created successfully!
            </p>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 shadow-sm">
            <AlertCircle className="text-red-600 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            <p className="text-red-800 font-medium text-sm sm:text-base break-words">
              {error}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-4 sm:space-y-6 relative"
        >
          <WorkOrderDetails register={register} errors={errors} watch={watch} />
          <PhotoUploader {...{ photos, onDropPhotos, setValue }} />
          <AssignmentSection register={register} errors={errors} />
          <ChecklistSection {...{ checklists, setChecklists }} />
          <SignatureSection register={register} watch={watch} />
          <SubmitForm {...{ isSubmitting, onClose }} />
        </form>
      </div>
    </div>
  );
}
