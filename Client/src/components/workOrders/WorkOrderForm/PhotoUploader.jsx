import React from "react";
import { useDropzone } from "react-dropzone";
import { X } from "lucide-react";

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
    <div className="bg-white/70 backdrop-blur-lg border border-slate-200 rounded-2xl shadow-lg p-6">
      <label className="text-slate-700 font-medium block mb-4">Photos</label>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-slate-600">
          {isDragActive ? "Drop files here..." : "Drag & drop or click to upload"}
        </p>
      </div>

      {photos?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {photos.map((file, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg border border-slate-200"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
