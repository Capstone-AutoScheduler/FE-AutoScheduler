import { create } from 'zustand'

const useStore = create((set) => ({
    startBubble : null,
    endBubble : null,
    operations : [],
    setStartBubble: (ref) => set({ startBubble: ref}),
    setEndBubble: (ref) => set({ endBubble: ref}),
    appendOperation: (line) => set((state) => ({ operations: [ ...state.operations, line] }))
}))

export default useStore;