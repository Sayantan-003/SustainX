import React from "react";
import {
  Box,
  MapPin,
  Barcode,
  Hash,
  Info,
  Layers,
  CheckCircle2,
  XCircle,
  CircleDot,
} from "lucide-react";

// Format date utility (if you plan to include dates later)
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function AssetsTable({ assets = [], onRowClick }) {
  const getStatusBadge = (status) => {
    const lower = status?.toLowerCase();
    switch (lower) {
      case "active":
        return {
          icon: <CheckCircle2 className="w-3 h-3" />,
          color: "bg-emerald-100 text-emerald-700",
          label: "Active",
        };
      case "inactive":
        return {
          icon: <XCircle className="w-3 h-3" />,
          color: "bg-slate-200 text-slate-700",
          label: "Inactive",
        };
      case "under maintenance":
        return {
          icon: <CircleDot className="w-3 h-3" />,
          color: "bg-amber-100 text-amber-700",
          label: "Under Maintenance",
        };
      default:
        return {
          icon: <CircleDot className="w-3 h-3" />,
          color: "bg-slate-100 text-slate-700",
          label: status || "Unknown",
        };
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="text-left text-xs uppercase text-slate-600 bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-4 font-semibold">Name</th>
            <th className="p-4 font-semibold">Image</th>
            <th className="p-4 font-semibold">Location</th>
            <th className="p-4 font-semibold">Barcode</th>
            <th className="p-4 font-semibold">Serial Number</th>
            <th className="p-4 font-semibold">Description</th>
            <th className="p-4 font-semibold">Category</th>
            <th className="p-4 font-semibold">Status</th>
          </tr>
        </thead>

        <tbody>
          {assets.length === 0 ? (
            <tr>
              <td colSpan="8" className="p-8 text-center text-slate-500">
                No assets found. Try adjusting your filters.
              </td>
            </tr>
          ) : (
            assets.map((asset) => {
              const statusBadge = getStatusBadge(asset.status);
              return (
                <tr
                  key={asset.id}
                  onClick={() => onRowClick?.(asset)}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="p-4 font-medium text-slate-800 flex items-center gap-2">
                    <Box className="w-4 h-4 text-slate-500" />
                    {asset.name}
                  </td>

                  <td className="p-4">
                    {asset.image ? (
                      <img
                        src={asset.image}
                        alt={asset.name}
                        className="w-12 h-12 object-cover rounded-md border border-slate-200"
                      />
                    ) : (
                      <div className="w-12 h-12 flex items-center justify-center rounded-md bg-slate-100 text-slate-400">
                        <Box className="w-5 h-5" />
                      </div>
                    )}
                  </td>

                  <td className="p-4 text-slate-700 flex items-center gap-1 text-sm">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {asset.location || "N/A"}
                  </td>

                  <td className="p-4 text-slate-700 text-sm flex items-center gap-1">
                    <Barcode className="w-3.5 h-3.5 text-slate-500" />
                    {asset.barcode || "N/A"}
                  </td>

                  <td className="p-4 text-slate-700 text-sm flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-slate-500" />
                    {asset.serialNumber || "N/A"}
                  </td>

                  <td className="p-4 text-slate-600 text-sm flex items-start gap-1">
                    <Info className="w-3.5 h-3.5 text-slate-500 mt-0.5" />
                    {asset.description || "N/A"}
                  </td>

                  <td className="p-4 text-slate-700 text-sm flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-slate-500" />
                    {asset.category || "N/A"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}
                    >
                      {statusBadge.icon}
                      {statusBadge.label}
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}