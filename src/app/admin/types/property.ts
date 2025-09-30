export interface Property {
  id: string;
  name: string;
  description: string;
  type: 'apartment' | 'house' | 'studio' | 'villa' | 'hotel';
  bhk: string;
  city: string;
  address: string;
  price: number;
  images: string[];
  amenities: string[];
  status: 'active' | 'inactive' | 'maintenance';
  tenantType: 'any' | 'family' | 'bachelor';
  availableFrom: string;
  contactNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFormData {
  name: string;
  description: string;
  type: Property['type'];
  bhk: string;
  city: string;
  address: string;
  price: number;
  amenities: string[];
  status: Property['status'];
  tenantType: Property['tenantType'];
  availableFrom: string;
  contactNumber: string;
}
