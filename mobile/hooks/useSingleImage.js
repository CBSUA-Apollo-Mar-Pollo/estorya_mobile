import { create } from "zustand";

export const useSingleImage = create((set) => ({
  data: {},
  setImageData: (imageData) => set({ data: imageData }),
}));
