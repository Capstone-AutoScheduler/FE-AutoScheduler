import { create } from "zustand"; // create로 zustand를 불러옵니다.

const useWebStore = create((set) => ({
  nodes: [],
  addNode: (path) =>
    set((state) => {
      return { nodes: [...state.nodes, path] };
    }),

  isClicked: false,
  setIsClicked: (bool) => set({ isClicked: bool }),

  mouseX: 0,
  mouseY: 0,
  bubble: {
    bubbleId: 0,
    text: "",
  },
  setMouseX: (value) => set({ mouseX: value }),
  setMouseY: (value) => set({ mouseY: value }),
  setBubble: (newBubble) =>
    set((state) => ({
      bubble: {
        ...state.bubble, // 기존 bubble 상태 유지
        ...newBubble, // 전달받은 newBubble로 업데이트
      },
    })),
  setBubbleText: () =>
    set((state) => ({
      bubble: {
        ...state.bubble, // 기존 bubble 상태 유지
        text: null, // text만 null로 설정
      },
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
  selectedFrameId: 0,
  setSelectedFrameId: (newId) =>
    set((state) => ({
      selectedFrameId: newId,
    })),
  appendFrame: (frame) =>
    set((state) => ({ frames: [...state.frames, frame] })),
  removeFrame: (frame) =>
    set((state) => ({
      frames: state.frames.filter((item) => item !== frame),
    })),
  addToTitle: (frameId, bubble) =>
    set((state) => ({
      frames: state.frames.map((frame) =>
        frame.id === frameId
          ? { ...frame, title: [...frame.title, bubble] }
          : frame
      ),
    })),
  addToDate: (frameId, bubble) =>
    set((state) => ({
      frames: state.frames.map((frame) =>
        frame.id === frameId
          ? { ...frame, date: [...frame.date, bubble] }
          : frame
      ),
    })),
  addToDetail: (frameId, bubble) =>
    set((state) => ({
      frames: state.frames.map((frame) =>
        frame.id === frameId
          ? { ...frame, detail: [...frame.detail, bubble] }
          : frame
      ),
    })),
  removeFromTitle: (frameId, bubbleId) =>
    set((state) => ({
      frames: state.frames.map((frame) =>
        frame.id === frameId
          ? {
              ...frame,
              title: frame.title.filter(
                (bubble) => bubble.bubbleId !== bubbleId
              ),
            }
          : frame
      ),
    })),
  removeFromDate: (frameId, bubbleId) =>
    set((state) => ({
      frames: state.frames.map((frame) =>
        frame.id === frameId
          ? {
              ...frame,
              date: frame.date.filter((bubble) => bubble.bubbleId !== bubbleId),
            }
          : frame
      ),
    })),
  removeFromDetail: (frameId, bubbleId) =>
    set((state) => ({
      frames: state.frames.map((frame) =>
        frame.id === frameId
          ? {
              ...frame,
              detail: frame.detail.filter(
                (bubble) => bubble.bubbleId !== bubbleId
              ),
            }
          : frame
      ),
    })),

  selected: {
    bubble: {
      bubbleId: 0,
      text: "",
    },
  },
  setSelectedBubble: (newBubble) =>
    set((state) => ({
      selected: {
        bubble: newBubble,
      },
    })),
}));

export default useWebStore;
