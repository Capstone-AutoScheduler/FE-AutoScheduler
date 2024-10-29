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

  frames: [{
    id: 0,
    str: 'target',
    x: 1000,
    y: 40,
    width: 80,
    height: 60,
  },
  {
    id: 1,
    str: 'target',
    x: 1400,
    y: 200,
    width: 80,
    height: 60,
  },
  {
    id: 2,
    str: 'target',
    x: 1200,
    y: 400,
    width: 80,
    height: 60,
  }],
  appendFrame: (frame) =>
    set((state) => ({ frames: [...state.frames, frame] })),

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
