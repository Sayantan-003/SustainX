import React, { useState } from "react";

export default function SignatureSection({ register, watch }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signatureRequired = watch("signatureRequired");

  return (
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
  );
}
