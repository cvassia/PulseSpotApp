import { create } from "zustand";

type CityState = {
    selectedCity: string | null;
    setCity: (city: string | null) => void;
};

export const useCityStore = create<CityState>((set) => ({
    selectedCity: null,
    setCity: (city) => set({ selectedCity: city }),
}));
