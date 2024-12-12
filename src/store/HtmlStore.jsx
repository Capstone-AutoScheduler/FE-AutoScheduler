import { create } from "zustand";

const useHtmlStore = create((set) => ({
  initHtml: () =>
    set({
      cssFile: "",
      htmlBody: "",
      updatedHtmlBody: "",
      bodyToGenerate: "",
    }),

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

  bodyToGenerate: "",
  setBodyToGenerate: (bodyToGenerate) =>
    set({
      bodyToGenerate: bodyToGenerate,
    }),

  url: "",
  setUrl: (url) =>
    set({
      url: url,
    }),

  submittedUsername: "",
  setSubmittedUsername: (submittedUsername) =>
    set({
      submittedUsername: submittedUsername,
    }),

  submittedPassword: "",
  setSubmittedPassword: (submittedPassword) =>
    set({
      submittedPassword: submittedPassword,
    }),

  isClikedRefresh: false,
  setIsClikedRefresh: (bool) => set({ isClikedRefresh: bool }),

  getEvent: false,
  setGetEvent: (bool) => set({ getEvent: bool }),
  // isUpdatedButton: false,
  // setIsUpdatedButton: (bool) => set({ isUpdatedButton: bool }),
}));

export default useHtmlStore;
