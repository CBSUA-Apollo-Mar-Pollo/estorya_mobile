import { create } from "zustand";

export const useSingleImage = create((set) => ({
  postData: {},
  image: {},
  setImageData: (postData, imageData) => set({ postData, image: imageData }),
}));
