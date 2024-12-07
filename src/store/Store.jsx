import { create } from "zustand";

const useStore = create((set) => ({
  isDragging: false,
  setIsDragging: (bool) => set({ isDragging: bool }),

  bubbles: [],
  setBubbles: (list) => set({ bubbles: list }),
  appendBubble: (bubble) =>
    set((state) => ({ bubbles: [...state.bubbles, bubble] })),
  setMapping: (targetId, bool) =>
    set((state) => ({
      bubbles: state.bubbles.map((bubble) =>
        bubble.id === targetId ? { ...bubble, mapping: bool } : bubble
      ),
    })),

  frames: [
    {
      id: 0,
      str: "target",
      title: [],
      date: [],
      detail: [],
    },
    {
      id: 1,
      str: "target",
      title: [],
      date: [],
      detail: [],
    },
  ],
  appendFrame: (frame) =>
    set((state) => ({ frames: [...state.frames, frame] })),
  removeFrame: (frame) =>
    set((state) => ({
      frames: state.frames.filter((item) => item !== frame),
    })),
  addToTitle: (frameId, operation) =>
    set((state) => ({
      frames: state.frames.map((frame) =>
        frame.id === frameId
          ? { ...frame, title: [...frame.title, operation] }
          : frame
      ),
    })),
  addToDate: (frameId, operation) =>
    set((state) => ({
      frames: state.frames.map((frame) =>
        frame.id === frameId
          ? { ...frame, date: [...frame.date, operation] }
          : frame
      ),
    })),
  addToDetail: (frameId, operation) =>
    set((state) => ({
      frames: state.frames.map((frame) =>
        frame.id === frameId
          ? { ...frame, detail: [...frame.detail, operation] }
          : frame
      ),
    })),
  removeFromTitle: (frameId, titleItem) =>
    set((state) => ({
      frames: state.frames.map((frame) =>
        frame.id === frameId
          ? {
              ...frame,
              title: frame.title.filter((item) => item !== titleItem),
            }
          : frame
      ),
    })),
  removeFromDate: (frameId, dateItem) =>
    set((state) => ({
      frames: state.frames.map((frame) =>
        frame.id === frameId
          ? { ...frame, date: frame.date.filter((item) => item !== dateItem) }
          : frame
      ),
    })),
  removeFromDetail: (frameId, detailItem) =>
    set((state) => ({
      frames: state.frames.map((frame) =>
        frame.id === frameId
          ? {
              ...frame,
              detail: frame.detail.filter((item) => item !== detailItem),
            }
          : frame
      ),
    })),

  selectedFrameId: 0,
  setSelectedFrameId: (newId) =>
    set((state) => ({
      selectedFrameId: newId,
    })),

  selected: {
    operation: null,
    bubble: null,
    area: null,
  },
  setSelectedOperation: (newOperation, newFrame) =>
    set((state) => ({
      selected: {
        frame: newFrame,
        operation: newOperation,
        bubble: null,
        area: null,
      },
    })),
  setSelectedBubble: (newBubble) =>
    set((state) => ({
      selected: {
        operation: null,
        bubble: newBubble,
        area: null,
      },
    })),
  setSelectedArea: (newArea) =>
    set((state) => ({
      selected: {
        operation: null,
        bubble: null,
        area: newArea,
      },
    })),

  mouseX: 0,
  mouseY: 0,
  setMouseX: (value) => set({ mouseX: value }),
  setMouseY: (value) => set({ mouseY: value }),

  areaStart: null,
  setAreaStart: (coord) => set({ areaStart: coord }),
  setAreaEnd: (coord) => set({ areaEnd: coord }),

  areas: [],
  appendArea: (area) =>
    set((state) => ({ areas: [...state.areas, area] })),

  startDate: null,
  setStartDate: (date) => 
    set({ startDate: date}),
}));

export default useStore;
