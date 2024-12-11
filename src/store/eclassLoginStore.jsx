import { create } from "zustand";

const eclassLoginStore = create((set) => ({
  userName: "",
  setUserName: (userName) =>
    set({
      userName: userName,
    }),

  password: "",
  setPassword: (password) =>
    set({
      password: password,
    }),
}));

export default eclassLoginStore;
