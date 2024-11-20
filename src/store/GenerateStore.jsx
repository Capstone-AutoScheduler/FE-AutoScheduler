import { create } from "zustand";

const useGenerateStore = create((set) => ({
    numPages: 0,
    setNumPages: (num) => set({
        numPages: num,
    }),
    targetPage: 1,
    setTargetPage: (num) => set({
        targetPage: num,
    }),
    increaseTargetPage: () => set((state) => ({ targetPage: state.targetPage + 1 })),

    pdfContent: null,
    setPdfContent: (content) => set({
        pdfContent: content,
    }),

    schedules: [],
    appendSchedule: (schedule) =>
        set((state) => ({ schedules: [...state.schedules, schedule] })),
}));

export default useGenerateStore;