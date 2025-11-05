// SignatureSection Component

import React, { useState } from "react";
import { FileSignature } from "lucide-react";

function SignatureSection({ register, watch }) {
  const signatureRequired = watch("signatureRequired");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
          <FileSignature className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          Completion Requirements
        </h2>
      </div>

      <label className="flex items-start sm:items-center gap-3 sm:gap-4 cursor-pointer group p-3 sm:p-4 hover:bg-slate-50 rounded-xl transition-colors">
        <input
          type="checkbox"
          {...register("signatureRequired")}
          className="sr-only"
        />
        <div
          className={`relative w-12 h-7 sm:w-14 sm:h-8 rounded-full p-1 transition-all flex-shrink-0 ${
            signatureRequired
              ? "bg-gradient-to-r from-blue-500 to-blue-600"
              : "bg-slate-300"
          }`}
        >
          <div
            className={`w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-md transition-transform ${
              signatureRequired ? "translate-x-5 sm:translate-x-6" : ""
            }`}
          ></div>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-sm sm:text-base font-semibold text-slate-700 block">
            Require Signature
          </span>
          <span className="text-xs sm:text-sm text-slate-500 block mt-0.5 sm:mt-1">
            Technician must sign upon completion
          </span>
        </div>
      </label>
    </div>
  );
}


export default SignatureSection;