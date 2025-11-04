// AssignmentSection.jsx
import { Users } from "lucide-react";

export default function AssignmentSection({ register, errors }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-50 rounded-lg">
          <Users className="w-5 h-5 text-indigo-600" />
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
          Assignment and Team
        </h2>
      </div>

      {/* First Row: Primary Assignee and Team */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Primary Assignee */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Primary Assignee
          </label>
          <input
            type="text"
            {...register("primaryAssignee")}
            placeholder="e.g., John Doe"
            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.primaryAssignee
                ? "border-red-300 focus:ring-red-500"
                : "border-slate-300 focus:ring-indigo-500"
            }`}
          />
          {errors.primaryAssignee && (
            <p className="mt-1 text-sm text-red-600">
              {errors.primaryAssignee.message}
            </p>
          )}
        </div>

        {/* Team */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Team/Contractor Name
          </label>
          <input
            type="text"
            {...register("team")}
            placeholder="e.g., Maintenance Team A"
            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.team
                ? "border-red-300 focus:ring-red-500"
                : "border-slate-300 focus:ring-indigo-500"
            }`}
          />
          {errors.team && (
            <p className="mt-1 text-sm text-red-600">
              {errors.team.message}
            </p>
          )}
        </div>
      </div>

      {/* Second Row: Additional Assignees */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Additional Assignee(s)
        </label>
        <input
          type="text"
          {...register("additionalAssignees")}
          placeholder="e.g., Jane Smith, Mike Johnson (comma-separated)"
          className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            errors.additionalAssignees
              ? "border-red-300 focus:ring-red-500"
              : "border-slate-300 focus:ring-indigo-500"
          }`}
        />
        {errors.additionalAssignees && (
          <p className="mt-1 text-sm text-red-600">
            {errors.additionalAssignees.message}
          </p>
        )}
        <p className="mt-1.5 text-xs text-slate-500">
          Enter multiple assignees separated by commas
        </p>
      </div>
    </div>
  );
}