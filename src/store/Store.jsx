import { create } from "zustand";

const useStore = create((set) => ({
  startBubble: null,
  endBubble: null,

  setStartBubble: (ref) => set({ startBubble: ref }),
  setEndBubble: (ref) => set({ endBubble: ref }),

  bubbles: [],
  setBubbles: (list) => set({ bubbles: list }),
  appendBubble: (bubble) =>
    set((state) => ({ bubbles: [...state.bubbles, bubble] })),


  operations: [],
  selectedOperation: null,
  setSelectedOperation: (index) =>
    set({ selectedOperation: index }),
  appendOperation: (line) =>
    set((state) => ({ operations: [...state.operations, line] })),
  removeOperation: (index) =>
    set((state) => ({
      operations: state.operations.filter((_, i) => i !== index),
    })),

  offsetX: 0,
  offsetY: 0,
  setOffsetX: (value) =>
    set({ offsetX: value}),
  setOffsetY: (value) =>
    set({ offsetY: value}),
}));

export default useStore;
