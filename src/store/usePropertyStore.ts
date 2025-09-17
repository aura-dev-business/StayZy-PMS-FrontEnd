// store/usePropertyStore.ts
"use client";

import { create } from "zustand";

interface Property {
  id: number;
  name: string;
  city: string;
  price: number;
}

interface PropertyStore {
  properties: Property[];
  addProperty: (property: Omit<Property, "id">) => void;
  updateProperty: (id: number, updated: Partial<Property>) => void;
  deleteProperty: (id: number) => void;
}

export const usePropertyStore = create<PropertyStore>((set) => ({
  properties: [
    { id: 1, name: "Luxury Stay", city: "Kochi", price: 2500 },
    { id: 2, name: "Budget Inn", city: "Bangalore", price: 1200 },
  ],

  addProperty: (property) =>
    set((state) => ({
      properties: [
        ...state.properties,
        { ...property, id: Date.now() }, // auto id
      ],
    })),

  updateProperty: (id, updated) =>
    set((state) => ({
      properties: state.properties.map((p) =>
        p.id === id ? { ...p, ...updated } : p
      ),
    })),

  deleteProperty: (id) =>
    set((state) => ({
      properties: state.properties.filter((p) => p.id !== id),
    })),
}));
