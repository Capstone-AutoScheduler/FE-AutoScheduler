import { create } from "zustand"; // create로 zustand를 불러옵니다.

const useWebStore = create((set) => ({
  initStore: () =>
    set({
      frames: [
        {
          id: 0,
          str: "target",
          title: [],
          date: [],
          detail: [],
        },
      ],
      selectedFrameId: 0,
      selected: {
        bubble: {
          bubbleId: 0,
          text: "",
        },
      },
      startDate: null,
    }),

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
    type: "",
    bubbleId: 0,
    text: "",
    mappings: {
      depth: 0,
      childrenIndexes: [],
    },
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
  setBubbleTextNull: () =>
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

  mappingList: [], // 초기값 설정
  addMapping: (newMapping) =>
    set((state) => ({
      mappingList: [...state.mappingList, newMapping],
    })),
  removeMappingById: (idToRemove) =>
    set((state) => ({
      mappingList: state.mappingList.filter((item) => item.id !== idToRemove),
    })),

  // mapping형식
  // mapping: {
  //   id: 0,
  //   depth: 0,
  //   childrenIndexes: 0,
  //   countBubble: 0,
  // },

  // appendMapping: (frame) =>
  //   set((state) => ({ frames: [...state.frames, frame] })),
  // removeFrame: (frame) =>
  //   set((state) => ({
  //     frames: state.frames.filter((item) => item !== frame),
  //   })),

  isHoverEnabled: false,
  setIsHoverEnabled: (bool) => set({ isHoverEnabled: bool }),
}));

export default useWebStore;
