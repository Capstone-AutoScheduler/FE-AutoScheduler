import { create } from "zustand";

const useStore = create((set) => ({
  startBubble: null,
  endBubble: null,
  operations: [],
  setStartBubble: (ref) => set({ startBubble: ref }),
  setEndBubble: (ref) => set({ endBubble: ref }),
  appendOperation: (line) =>
    set((state) => ({ operations: [...state.operations, line] })),

  bubbles: [
    {
      id: 0,
      x: 10,
      y: 40,
      width: 80,
      height: 60,
    },
    {
      id: 1,
      x: 200,
      y: 200,
      width: 80,
      height: 60,
    },
    {
      id: 2,
      x: 50,
      y: 400,
      width: 80,
      height: 60,
    },
  ],
  setBubbles: (list) => set({ bubbles: list })
}));

export default useStore;
