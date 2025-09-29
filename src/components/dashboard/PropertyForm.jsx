// components/dashboard/PropertyForm.jsx
"use client";

import { useState, useEffect } from "react";
import { usePropertyStore } from "@/store/usePropertyStore";

export default function PropertyForm({ onClose, property, onChange }) {
  const { addProperty, updateProperty } = usePropertyStore();
  const [form, setForm] = useState({
    name: "",
    city: "",
    price: "",
  });

  // If editing, preload data
  useEffect(() => {
    if (property) {
      setForm(property);
    }
  }, [property]);

  // Notify parent of form changes
  useEffect(() => {
    if (onChange) {
      onChange(form);
    }
  }, [form, onChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (property) {
      updateProperty(property.id, form);
    } else {
      addProperty(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">
          {property ? "Edit Property" : "Add New Property"}
        </h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Property Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Price per Night"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input type="file" multiple className="w-full" />

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-slate-900 text-white px-4 py-2 rounded"
            >
              {property ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
    