import { create } from "zustand";

const useGenerateStore = create((set) => ({
    pdfContent: null,
    setPdfContent: (content) => set({
        pdfContent: content,
    }),

    schedules: [],
    appendSchedule: (schedule) =>
        set((state) => ({ schedules: [...state.schedules, schedule] })),
}));

export default useGenerateStore;