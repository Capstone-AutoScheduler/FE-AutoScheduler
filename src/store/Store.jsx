import { create } from "zustand";

const useStore = create((set) => ({
  startBubble: null,
  setStartBubble: (ref) => set({ startBubble: ref }),

  bubbles: [],
  setBubbles: (list) => set({ bubbles: list }),
  appendBubble: (bubble) =>
    set((state) => ({ bubbles: [...state.bubbles, bubble] })),
  setMapping: (targetId, bool) => set((state) => ({
    bubbles: state.bubbles.map((bubble) =>
      bubble.id === targetId ? { ...bubble, mapping: bool} : bubble
    ),
  })),

  frames: [{
    id: 0,
    str: 'target',
    x: 1000,
    y: 40,
    width: 320,
    height: 140,
    title: [],
    date: [],
    detail: [],
  },
  {
    id: 1,
    str: 'target',
    x: 1000,
    y: 200,
    width: 320,
    height: 140,
    title: [],
    date: [],
    detail: [],
  }],
  appendFrame: (frame) =>
    set((state) => ({ frames: [...state.frames, frame] })),
  addToTitle: (frameId, operation) => set((state) => ({
    frames: state.frames.map((frame) =>
      frame.id === frameId
        ? { ...frame, title: [...frame.title, operation] }
        : frame
    ),
  })),
  addToDate: (frameId, operation) => set((state) => ({
    frames: state.frames.map((frame) =>
      frame.id === frameId
        ? { ...frame, date: [...frame.date, operation] }
        : frame
    ),
  })),
  addToDetail: (frameId, operation) => set((state) => ({
    frames: state.frames.map((frame) =>
      frame.id === frameId
        ? { ...frame, detail: [...frame.detail, operation] }
        : frame
    ),
  })),
  removeFromTitle: (frameId, titleItem) => set((state) => ({
    frames: state.frames.map((frame) =>
      frame.id === frameId
        ? { ...frame, title: frame.title.filter((item) => item !== titleItem) }
        : frame
    ),
  })),
  removeFromDate: (frameId, dateItem) => set((state) => ({
    frames: state.frames.map((frame) =>
      frame.id === frameId
        ? { ...frame, date: frame.date.filter((item) => item !== dateItem) }
        : frame
    ),
  })),
  removeFromDetail: (frameId, detailItem) => set((state) => ({
    frames: state.frames.map((frame) =>
      frame.id === frameId
        ? { ...frame, detail: frame.detail.filter((item) => item !== detailItem) }
        : frame
    ),
  })),

  selected: {
    frame: null,
    operation: null,
    bubble: null,
  },
  setSelectedFrame: (newFrame) => set((state) => ({
    selected: {
      frame: newFrame,
      operation: null,
      bubble: null,
    },
  })),
  setSelectedOperation: (newOperation, newFrame) => set((state) => ({
    selected: {
      frame: newFrame,
      operation: newOperation,
      bubble: null,
    },
  })),
  setSelectedBubble: (newBubble) => set((state) => ({
    selected: {
      frame: null,
      operation: null,
      bubble: newBubble,
    },
  })),

  mouseX: 0,
  mouseY: 0,
  setMouseX: (value) =>
    set({ mouseX: value}),
  setMouseY: (value) =>
    set({ mouseY: value}),

  offsetX: 0,
  offsetY: 0,
  setOffsetX: (value) =>
    set({ offsetX: value}),
  setOffsetY: (value) =>
    set({ offsetY: value}),
}));

export default useStore;
