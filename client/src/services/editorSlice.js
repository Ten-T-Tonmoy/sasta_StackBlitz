import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "javascript",
  theme: "vs-dark",
  code: `// set back relax and kaboom!
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\///\\//\\`,
  output: "",
  sideBarWidth: 200,
  bottomBarHeight: 170,
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      // action ={ type:"editor", pyload:"javascript" }
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setOutput: (state, action) => {
      state.output = action.payload;
    },
    setSideBarWidth: (state, action) => {
      state.sideBarWidth = action.payload;
    },
    setBottomBarHeight: (state, action) => {
      state.bottomBarHeight = action.payload;
    },
  },
});

//each func in reducer auto becomes actions
export const {
  setLanguage,
  setTheme,
  setCode,
  setOutput,
  setSideBarWidth,
  setBottomBarHeight,
} = editorSlice.actions;

export default editorSlice.reducer;
