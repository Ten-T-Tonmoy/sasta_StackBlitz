import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setBottomBarHeight,
  setSideBarWidth,
  setCode,
  setOutput,
} from "../../services/editorSlice";

//portion components importing
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import FileExplorer from "./FileExplorer";

const CodeEditor = () => {
  //for lang and theme choosing
  const language = useSelector((state) => state.editor.language);
  const theme = useSelector((state) => state.editor.theme);
  const dispatch = useDispatch();

  //for input and output
  const code = useSelector((state) => state.editor.code);
  const output = useSelector((state) => state.editor.output);

  const runCode = async () => {
    try {
      const res = await axios.post("http://localhost:3000/execute", {
        code,
        language,
      });
      dispatch(setOutput(res.data.output));
      //receving parameter name beaware dude
    } catch (error) {
      dispatch(setOutput("Error occured while running code"));
      console.log(error);
    }
  };

  //for resizeable splitter/split plane side panel
  const minSideWidth = 150;
  const minBottomHeight = 150;

  const sideBarWidth = useSelector((state) => state.editor.sideBarWidth); //for pixel perfection man
  const bottomBarHeight = useSelector((state) => state.editor.bottomBarHeight);
  const isChanging = useRef(null);

  const startSideChange = () => {
    isChanging.current = "sideBar";
    document.body.style.cursor = "col-resize";
  };

  const startBottomChange = () => {
    isChanging.current = "bottomBar";
    document.body.style.cursor = "row-resize";
  };

  const stopChange = () => {
    isChanging.current = null;
    document.body.style.cursor = "default";
  };

  const handleChange = (e) => {
    if (!isChanging.current) return;
    //X axis will be for vertical Y will be for horizontal

    if (isChanging.current === "sideBar") {
      const newWidth = e.clientX;
      if (newWidth < window.innerWidth * 0.8)
        dispatch(setSideBarWidth(Math.max(newWidth, minSideWidth)));
    } else if (isChanging.current === "bottomBar") {
      //from top calc it suks af

      const newHeight = window.innerHeight - e.clientY;
      if (newHeight < 0.8 * window.innerHeight) {
        dispatch(setBottomBarHeight(Math.max(newHeight, minBottomHeight)));
      }
    }
  };

  //for splitter horizental

  useEffect(() => {
    window.addEventListener("mousemove", handleChange);
    window.addEventListener("mouseup", stopChange);

    return () => {
      //event listeners otherwise stays forever?
      window.removeEventListener("mousemove", handleChange);
      window.removeEventListener("mouseup", stopChange);
    };
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] overflow-hidden">
      <TopBar language={language} theme={theme} runCode={runCode} />
      <div
        style={{ height: `calc(95vh - ${bottomBarHeight}px - 4px)` }}
        className="flex "
      >
        <FileExplorer sideBarWidth={sideBarWidth} />
        <div
          onMouseDown={startSideChange}
          className="border hover:w-1 hover:cursor-col-resize border-gray-700/40 hover:bg-blue-500 "
        ></div>
        <Editor
          width={`calc(100vw - ${sideBarWidth}px - 4px)`}
          height={`calc(95vh-${bottomBarHeight}px - 4px)`}
          language={language}
          defaultLanguage="javascript"
          value={code}
          theme={theme}
          onChange={(val) => dispatch(setCode(val || ""))}
        />
      </div>
      <div
        onMouseDown={startBottomChange}
        className="hover:h-[6px] h-1  hover:cursor-row-resize border-gray-700 border-t-1
         hover:bg-blue-500"
      ></div>
      <BottomBar output={output} bottomBarHeight={bottomBarHeight} />
    </div>
  );
};

export default CodeEditor;
