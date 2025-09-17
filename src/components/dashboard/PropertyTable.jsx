// components/dashboard/PropertyTable.jsx
"use client";

import { usePropertyStore } from "@/store/usePropertyStore";

export default function PropertyTable({ onEdit }) {
  const { properties, deleteProperty } = usePropertyStore();

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">City</th>
            <th className="p-3">Price</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id} className="border-b">
              <td className="p-3">{property.name}</td>
              <td className="p-3">{property.city}</td>
              <td className="p-3">₹{property.price}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => onEdit(property)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProperty(property.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
