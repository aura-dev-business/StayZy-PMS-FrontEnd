// components/dashboard/PropertyPreview.tsx
"use client";

import Image from "next/image";

interface PropertyPreviewProps {
  data: any;
}

export default function PropertyPreview({ data }: PropertyPreviewProps) {
  if (!data) {
    return (
      <div className="border border-dashed rounded-lg p-6 flex items-center justify-center text-gray-400">
        Fill the form to see live preview here
      </div>
    );
  }

  return (
    <div className="border rounded-xl shadow-md overflow-hidden">
      {/* Property Image */}
      <div className="relative w-full h-48 bg-gray-100">
        {data.images && data.images.length > 0 ? (
          <Image
            src={data.images[0]}
            alt={data.name || "Property"}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No Image Uploaded
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">
          {data.name || "Property Name"}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {data.description || "Property description will appear here"}
        </p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-slate-900 font-bold">
            ₹{data.price || "0"}/month
          </span>
          <span className="text-sm text-gray-500">
            {data.city || "City"}
          </span>
        </div>

        <div className="flex gap-2 text-xs text-gray-500 mt-2">
          <span className="bg-gray-100 px-2 py-1 rounded">
            {data.type || "Type"}
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded">
            {data.tenantType || "Tenant"}
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded">
            {data.bhkType || "BHK"}
          </span>
        </div>
      </div>
    </div>
  );
}
