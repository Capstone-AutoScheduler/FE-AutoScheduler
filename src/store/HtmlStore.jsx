import { create } from "zustand";

const useHtmlStore = create((set) => ({
  // url: null,
  // setUrl: (url) =>
  //   set({
  //     url: url,
  //   }),
  cssFile: "",
  setCssFile: (cssFile) =>
    set({
      cssFile: cssFile,
    }),

  htmlBody: "",
  setHtmlBody: (htmlBody) =>
    set({
      htmlBody: htmlBody,
    }),

  updatedHtmlBody: "",
  setUpdatedHtmlBody: (updatedHtmlBody) =>
    set({
      updatedHtmlBody: updatedHtmlBody,
    }),

  bodyForGenerate: "",
  setBodyForGenerate: (bodyForGenerate) =>
    set({
      bodyForGenerate: bodyForGenerate,
    }),

  // isUpdatedButton: false,
  // setIsUpdatedButton: (bool) => set({ isUpdatedButton: bool }),
}));

export default useHtmlStore;
