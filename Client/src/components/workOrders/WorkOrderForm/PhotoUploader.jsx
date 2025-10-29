// import React from "react";
// import { useDropzone } from "react-dropzone";
// import { X } from "lucide-react";

// export default function PhotoUploader({ photos, onDropPhotos, setValue }) {
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop: onDropPhotos,
//     accept: { "image/*": [] },
//   });

//   const removePhoto = (index) => {
//     const newPhotos = photos.filter((_, i) => i !== index);
//     setValue("photos", newPhotos, { shouldValidate: true });
//   };

//   return (
//     <div className="bg-white/70 backdrop-blur-lg border border-slate-200 rounded-2xl shadow-lg p-6">
//       <label className="text-slate-700 font-medium block mb-4">Photos</label>

//       <div
//         {...getRootProps()}
//         className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
//           isDragActive
//             ? "border-blue-500 bg-blue-50"
//             : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
//         }`}
//       >
//         <input {...getInputProps()} />
//         <p className="text-slate-600">
//           {isDragActive ? "Drop files here..." : "Drag & drop or click to upload"}
//         </p>
//       </div>

//       {photos?.length > 0 && (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//           {photos.map((file, index) => (
//             <div key={index} className="relative group">
//               <img
//                 src={URL.createObjectURL(file)}
//                 alt="Preview"
//                 className="w-full h-32 object-cover rounded-lg border border-slate-200"
//               />
//               <button
//                 type="button"
//                 onClick={() => removePhoto(index)}
//                 className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
//               >
//                 <X size={16} />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



import React from "react";
import { useDropzone } from "react-dropzone";
import { X, Upload, Image } from "lucide-react";

export default function PhotoUploader({ photos, onDropPhotos, setValue }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropPhotos,
    accept: { "image/*": [] },
  });

  const removePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setValue("photos", newPhotos, { shouldValidate: true });
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg border border-slate-200 rounded-2xl shadow-lg p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Image className="w-5 h-5 text-slate-600" />
        <label className="text-slate-700 font-medium text-sm sm:text-base">
          Photos
        </label>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-slate-400" />
        <p className="text-slate-600 text-sm sm:text-base font-medium mb-1">
          {isDragActive ? "Drop files here..." : "Drag & drop photos here"}
        </p>
        <p className="text-slate-500 text-xs sm:text-sm">
          or click to browse from your device
        </p>
      </div>

      {photos?.length > 0 && (
        <div className="mt-4 sm:mt-6">
          <p className="text-sm font-medium text-slate-700 mb-3">
            Uploaded Photos ({photos.length})
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {photos.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 sm:h-32 object-cover rounded-lg border-2 border-slate-200 group-hover:border-slate-300 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                  aria-label="Remove photo"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}