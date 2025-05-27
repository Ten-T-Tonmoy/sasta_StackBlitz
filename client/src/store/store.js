//change this to zustand if small file
import { configureStore } from "@reduxjs/toolkit";
import editorSlice from "../services/editorSlice";

export const store = configureStore({
  reducer: {
    editor: editorSlice,
  },
});
