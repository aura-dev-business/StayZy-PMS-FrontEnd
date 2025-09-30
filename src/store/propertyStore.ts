import { create } from 'zustand';

interface Property {
  id: string;
  title: string;
  city: string;
  pricePerMonth: number;
  images?: string[];
  image?: string;
  imageUrl?: string;
  bhkType?: string;
  tenantType?: string;
}

interface PropertyState {
  properties: Property[];
  cities: string[];
  propertyTypes: string[];
  bhkTypes: string[];
  tenantTypes: string[];
  selectedLocation: string;
  searchQuery: string;
  propertyType: string;
  bhkType: string;
  tenantType: string;
  sortBy: string;
  currentImageIndex: Record<string, number>;
  imageTransition: Record<string, boolean>;
  favorites: Set<string>;
  loading: boolean;
  setProperties: (properties: Property[]) => void;
  setCities: (cities: string[]) => void;
  setPropertyTypes: (types: string[]) => void;
  setSelectedLocation: (location: string) => void;
  setSearchQuery: (query: string) => void;
  setPropertyType: (type: string) => void;
  setBhkType: (type: string) => void;
  setTenantType: (type: string) => void;
  setSortBy: (sort: string) => void;
  setLoading: (loading: boolean) => void;
  setCurrentImageIndex: (id: string, index: number) => void;
  setImageTransition: (id: string, transition: boolean) => void;
  toggleFavorite: (id: string) => void;
  fetchProperties: () => Promise<void>;
}

export const usePropertyStore = create<PropertyState>((set) => ({
  properties: [],
  cities: [],
  propertyTypes: [],
  bhkTypes: ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'],
  tenantTypes: ['Family', 'Bachelors', 'Company', 'Girls'],
  selectedLocation: 'All',
  searchQuery: '',
  propertyType: 'Property Type',
  bhkType: 'BHK Type',
  tenantType: 'Tenant Type',
  sortBy: 'default',
  currentImageIndex: {},
  imageTransition: {},
  favorites: new Set(),
  loading: true,

  setProperties: (properties) => set({ properties }),
  setCities: (cities) => set({ cities }),
  setPropertyTypes: (propertyTypes) => set({ propertyTypes }),
  setSelectedLocation: (selectedLocation) => set({ selectedLocation }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setPropertyType: (propertyType) => set({ propertyType }),
  setBhkType: (bhkType) => set({ bhkType }),
  setTenantType: (tenantType) => set({ tenantType }),
  setSortBy: (sortBy) => set({ sortBy }),
  setLoading: (loading) => set({ loading }),
  
  setCurrentImageIndex: (id, index) => 
    set((state) => ({
      currentImageIndex: { ...state.currentImageIndex, [id]: index }
    })),
  
  setImageTransition: (id, transition) => 
    set((state) => ({
      imageTransition: { ...state.imageTransition, [id]: transition }
    })),
  
  toggleFavorite: (id) => 
    set((state) => {
      const newFavorites = new Set(state.favorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return { favorites: newFavorites };
    }),
  
  fetchProperties: async () => {
    set({ loading: true });
    try {
      const [res, cityRes] = await Promise.all([
        fetch('http://localhost:8081/api/properties', { credentials: 'include' }),
        fetch('http://localhost:8081/api/properties/city/all'),
      ]);

      const data: Property[] = await res.json();
      const cityData: string[] = await cityRes.json();

      const idx: Record<string, number> = {};
      const trans: Record<string, boolean> = {};
      data.forEach((p) => {
        idx[p.id] = 0;
        trans[p.id] = false;
      });

      set({
        properties: data,
        cities: cityData,
        propertyTypes: Array.from(new Set(data.map((p) => p.title.split(' ')[0]))),
        currentImageIndex: idx,
        imageTransition: trans,
        loading: false
      });
    } catch (err) {
      console.error(err);
      set({ properties: [], loading: false });
    }
  }
}));