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

  bodyForGenerate: "",
  setBodyForGenerate: (bodyForGenerate) =>
    set({
      bodyForGenerate: bodyForGenerate,
    }),
}));

export default useHtmlStore;
