// //WorkOrderForm/WorkOrderDetails.jsx:
// import React from "react";
// import { Calendar, Clock, AlertCircle } from "lucide-react";

// const getPriorityColor = (priority) => {
//   switch (priority) {
//     case "High":
//       return "bg-red-50 border-red-200 text-red-700";
//     case "Medium":
//       return "bg-amber-50 border-amber-200 text-amber-700";
//     default:
//       return "bg-emerald-50 border-emerald-200 text-emerald-700";
//   }
// };

// export default function WorkOrderDetails({ register, errors, watch }) {
//   const priority = watch("priority");
//   const category = watch("category");

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
//       {/* Title */}
//       <div>
//         <label className="block text-sm font-semibold text-slate-700 mb-2">
//           Work Order Title <span className="text-red-500">*</span>
//         </label>
//         <input
//           type="text"
//           {...register("title")}
//           placeholder="e.g., Repair HVAC system in Building A"
//           className={`w-full border-2 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 transition-all ${
//             errors.title
//               ? "border-red-300 focus:border-red-500 focus:ring-red-100"
//               : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
//           }`}
//         />
//         {errors.title && (
//           <div className="flex items-center gap-2 mt-2 text-red-600">
//             <AlertCircle className="w-4 h-4" />
//             <p className="text-sm">{errors.title.message}</p>
//           </div>
//         )}
//       </div>

//       {/* Description */}
//       <div>
//         <label className="block text-sm font-semibold text-slate-700 mb-2">
//           Description
//         </label>
//         <textarea
//           {...register("description")}
//           placeholder="Provide detailed information about the work order..."
//           rows={4}
//           className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
//         />
//       </div>

//       {/* Category & Priority Row */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-visible relative py-4">
//         {/* Category */}
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">
//             Category <span className="text-red-500">*</span>
//           </label>
//           <div className="relative w-full max-w-full">
//             <select
//               {...register("category")}
//               className={`w-full max-w-full border-2 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-4 transition-all appearance-none bg-white ${
//                 errors.category
//                   ? "border-red-300 focus:border-red-500 focus:ring-red-100"
//                   : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
//               }`}
//             >
//               <option value="">Select Category</option>
//               <option value="Electrical">⚡ Electrical</option>
//               <option value="Mechanical">⚙️ Mechanical</option>
//               <option value="Other">📋 Other</option>
//             </select>

//             {errors.category && (
//               <div className="flex items-center gap-2 mt-2 text-red-600">
//                 <AlertCircle className="w-4 h-4" />
//                 <p className="text-sm">{errors.category.message}</p>
//               </div>
//             )}

//             {/* Conditional manual category input */}
//             {category === "Other" && (
//               <div className="mt-4">
//                 <input
//                   type="text"
//                   {...register("customCategory")}
//                   placeholder="Enter custom category"
//                   className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Priority */}
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">
//             Priority Level
//           </label>
//           <div className="relative w-full max-w-full">
//             <select
//               {...register("priority")}
//               className={`w-full max-w-full border-2 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-4 transition-all appearance-none ${getPriorityColor(
//                 priority
//               )}`}
//             >
//               <option value="Low">Low Priority</option>
//               <option value="Medium">Medium Priority</option>
//               <option value="High">High Priority</option>
//             </select>
//             <div
//               className={`absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none ${
//                 priority === "High"
//                   ? "bg-red-500"
//                   : priority === "Medium"
//                   ? "bg-amber-500"
//                   : "bg-emerald-500"
//               }`}
//             ></div>
//           </div>
//         </div>
//       </div>

//       {/* Date Range & Duration */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">
//             <Calendar className="w-4 h-4 inline mr-1" />
//             Start Date
//           </label>
//           <input
//             type="date"
//             {...register("startDate")}
//             className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">
//             <Calendar className="w-4 h-4 inline mr-1" />
//             Due Date
//           </label>
//           <input
//             type="date"
//             {...register("dueDate")}
//             className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">
//             <Clock className="w-4 h-4 inline mr-1" />
//             Duration (hours)
//           </label>
//           <input
//             type="number"
//             {...register("duration", { valueAsNumber: true })}
//             placeholder="0"
//             className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }


//WorkOrderForm//WorkOrderDetails.jsx:
// import React from "react";
// import { Calendar, Clock, AlertCircle, ClipboardList } from "lucide-react";

// const getPriorityColor = (priority) => {
//   switch (priority) {
//     case "High":
//       return "bg-red-50 border-red-200 text-red-700";
//     case "Medium":
//       return "bg-amber-50 border-amber-200 text-amber-700";
//     default:
//       return "bg-emerald-50 border-emerald-200 text-emerald-700";
//   }
// };

// export default function WorkOrderDetails({ register, errors, watch }) {
//   const priority = watch("priority");
//   const category = watch("category");

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8">
//       {/* Header */}
//       <div className="flex items-center gap-3 mb-6 sm:mb-8">
//         <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
//           <ClipboardList className="w-5 h-5 text-white" />
//         </div>
//         <h2 className="text-lg sm:text-xl font-bold text-slate-900">
//           Create Work Order
//         </h2>
//       </div>

//       <div className="space-y-4 sm:space-y-6">
//         {/* Title */}
//         <div>
//           <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
//             Work Order Title <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             {...register("title")}
//             placeholder="e.g., Repair HVAC system in Building A"
//             className={`w-full border-2 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 transition-all ${
//               errors.title
//                 ? "border-red-300 focus:border-red-500 focus:ring-red-100"
//                 : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
//             }`}
//           />
//           {errors.title && (
//             <div className="flex items-center gap-2 mt-2 text-red-600">
//               <AlertCircle className="w-4 h-4 flex-shrink-0" />
//               <p className="text-xs sm:text-sm">{errors.title.message}</p>
//             </div>
//           )}
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
//             Description
//           </label>
//           <textarea
//             {...register("description")}
//             placeholder="Provide detailed information about the work order..."
//             rows={4}
//             className="w-full border-2 border-slate-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
//           />
//         </div>

//         {/* Category & Priority Row */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//           {/* Category */}
//           <div className="relative z-10">
//             <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
//               Category <span className="text-red-500">*</span>
//             </label>
//             <select
//               {...register("category")}
//               className={`w-full border-2 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-4 transition-all appearance-none bg-white ${
//                 errors.category
//                   ? "border-red-300 focus:border-red-500 focus:ring-red-100"
//                   : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
//               }`}
//             >
//               <option value="">Select Category</option>
//               <option value="Electrical">⚡ Electrical</option>
//               <option value="Mechanical">⚙️ Mechanical</option>
//               <option value="Plumbing">🚰 Plumbing</option>
//               <option value="HVAC">❄️ HVAC</option>
//               <option value="Other">📋 Other</option>
//             </select>

//             {errors.category && (
//               <div className="flex items-center gap-2 mt-2 text-red-600">
//                 <AlertCircle className="w-4 h-4 flex-shrink-0" />
//                 <p className="text-xs sm:text-sm">{errors.category.message}</p>
//               </div>
//             )}

//             {/* Conditional manual category input */}
//             {category === "Other" && (
//               <div className="mt-3 sm:mt-4">
//                 <input
//                   type="text"
//                   {...register("customCategory")}
//                   placeholder="Enter custom category"
//                   className="w-full border-2 border-slate-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Priority */}
//           <div className="relative z-10">
//             <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
//               Priority Level
//             </label>
//             <div className="relative">
//               <select
//                 {...register("priority")}
//                 className={`w-full border-2 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium focus:outline-none focus:ring-4 transition-all appearance-none ${getPriorityColor(
//                   priority
//                 )}`}
//               >
//                 <option value="Low">Low Priority</option>
//                 <option value="Medium">Medium Priority</option>
//                 <option value="High">High Priority</option>
//               </select>
//               <div
//                 className={`absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full pointer-events-none ${
//                   priority === "High"
//                     ? "bg-red-500"
//                     : priority === "Medium"
//                     ? "bg-amber-500"
//                     : "bg-emerald-500"
//                 }`}
//               ></div>
//             </div>
//           </div>
//         </div>

//         {/* Date Range & Duration */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
//           <div>
//             <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
//               <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1" />
//               Start Date
//             </label>
//             <input
//               type="date"
//               {...register("startDate")}
//               className="w-full border-2 border-slate-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
//             />
//           </div>

//           <div>
//             <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
//               <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1" />
//               Due Date
//             </label>
//             <input
//               type="date"
//               {...register("dueDate")}
//               className="w-full border-2 border-slate-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
//             />
//           </div>

//           <div className="sm:col-span-2 md:col-span-1">
//             <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
//               <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1" />
//               Duration (hours)
//             </label>
//             <input
//               type="number"
//               {...register("duration", { valueAsNumber: true })}
//               placeholder="0"
//               min="0"
//               step="0.5"
//               className="w-full border-2 border-slate-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






//WorkOrderForm//WorkOrderDetails.jsx:
import React from "react";
import { Calendar, Clock, AlertCircle, ClipboardList } from "lucide-react";

const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-50 border-red-200 text-red-700";
    case "Medium":
      return "bg-amber-50 border-amber-200 text-amber-700";
    default:
      return "bg-emerald-50 border-emerald-200 text-emerald-700";
  }
};

export default function WorkOrderDetails({ register, errors, watch }) {
  const priority = watch("priority");
  const category = watch("category");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
          <ClipboardList className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          Create Work Order
        </h2>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Title */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
            Work Order Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("title")}
            placeholder="e.g., Repair HVAC system in Building A"
            className={`w-full border-2 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 transition-all ${
              errors.title
                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />
          {errors.title && (
            <div className="flex items-center gap-2 mt-2 text-red-600">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p className="text-xs sm:text-sm">{errors.title.message}</p>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Provide detailed information about the work order..."
            rows={4}
            className="w-full border-2 border-slate-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
          />
        </div>

        {/* Category & Priority Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 isolate">
          {/* Category */}
          <div className="relative">
            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              {...register("category")}
              className={`w-full border-2 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-4 transition-all appearance-none bg-white relative z-[1] ${
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
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p className="text-xs sm:text-sm">{errors.category.message}</p>
              </div>
            )}

            {/* Conditional manual category input */}
            {category === "Other" && (
              <div className="mt-3 sm:mt-4">
                <input
                  type="text"
                  {...register("customCategory")}
                  placeholder="Enter custom category"
                  className="w-full border-2 border-slate-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                />
              </div>
            )}
          </div>

          {/* Priority */}
          <div className="relative">
            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
              Priority Level
            </label>
            <div className="relative">
              <select
                {...register("priority")}
                className={`w-full border-2 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium focus:outline-none focus:ring-4 transition-all appearance-none relative z-[1] ${getPriorityColor(
                  priority
                )}`}
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
              <div
                className={`absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full pointer-events-none ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1" />
              Start Date
            </label>
            <input
              type="date"
              {...register("startDate")}
              className="w-full border-2 border-slate-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1" />
              Due Date
            </label>
            <input
              type="date"
              {...register("dueDate")}
              className="w-full border-2 border-slate-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
            />
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1" />
              Duration (hours)
            </label>
            <input
              type="number"
              {...register("duration", { valueAsNumber: true })}
              placeholder="0"
              min="0"
              step="0.5"
              className="w-full border-2 border-slate-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}