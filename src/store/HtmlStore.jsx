import { create } from "zustand";

const useHtmlStore = create((set) => ({
  url: null,
  setUrl: (url) =>
    set({
      url: url,
    }),
  cssFile: null,
  setCssFile: (cssFile) =>
    set({
      cssFile: cssFile,
    }),

  htmlBody: null,
  setHtmlBody: (htmlBody) =>
    set({
      htmlBody: htmlBody,
    }),
}));

export default useHtmlStore;
