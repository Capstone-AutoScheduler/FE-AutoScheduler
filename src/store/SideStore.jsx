import { create } from "zustand";

const useSideStore = create((set) => ({
    isOpen : false,
    setIsOpen : (bool) => set({isOpen : bool}),
    toggleOpen : () => set((state) => ({ isOpen : !state.isOpen}))
}));

export default useSideStore;