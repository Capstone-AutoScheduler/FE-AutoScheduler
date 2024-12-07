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

    results: [],
    setResults: (input) => set({
        results: input
    }),
    appendResult: (result) =>
        set((state) => ({ results: [...state.results, result] })),
    updateResultAtIndex: (index, newResult) =>
        set((state) => {
            const updatedResults = [...state.results];
            updatedResults[index] = newResult;
            return { results: updatedResults };
        }),

    selectedResult: null,
    setSelectedResult: (index) => set({
        selectedResult: index,
    }),

    scheduleColor: '#000000',
    setScheduleColor: (newColor) => set({
        scheduleColor: newColor,
    })
}));

export default useGenerateStore;