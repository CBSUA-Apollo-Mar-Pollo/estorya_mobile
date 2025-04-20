import { create } from "zustand";

export const useSingleImage = create((set) => ({
  postData: {},
  image: {},
  setImageData: (postData, imageData) => set({ postData, image: imageData }),
}));

export const useHideHeader = create((set) => ({
  currentRoute: 0,
  setCurrentRoute: (routeIndex) => set({ currentRoute: routeIndex }),
}));
