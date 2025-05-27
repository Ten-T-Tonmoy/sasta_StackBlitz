import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

import { IoPlayOutline } from "react-icons/io5";

const CodeEditor = () => {
  //for lang and theme choosing
  const [language, setLanguage] = useState("cpp");
  const [theme, setTheme] = useState("vs-dark");

  //for input and output
  const [code, setCode] = useState("// set back relax and kaboom!");
  const [output, setOutput] = useState("");

  const runCode = async () => {
    try {
      const res = await axios.post("http://localhost:3000/execute", {
        code,
        language,
      });
      setOutput(res.data.output);
      //receving parameter name beaware dude
    } catch (error) {
      setOutput("Error occured while running code");
      console.log(error);
    }
  };

  //for resizeable splitter/split plane side panel
  const minSideWidth = 150;
  const minBottomHeight = 150;

  const [sideBarWidth, setSideBarWidth] = useState(300); //for pixel perfection man
  const [bottomBarHeight, setBottomBarHeight] = useState(170);
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
      setSideBarWidth(Math.max(e.clientX, minSideWidth));
    } else if (isChanging.current === "bottomBar") {
      //from top calc it suks af

      const newHeight = window.innerHeight - e.clientY;
      if (newHeight < 0.8 * window.innerHeight) {
        setBottomBarHeight(Math.max(newHeight, minBottomHeight));
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
      <div
        className="
      h-[5vh] bg-gray-900 items-center flex justify-between text-[.8rem]"
      >
        <select
          className="cursor-pointer px-2 hover:bg-gray-800 p-1 "
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
        </select>
        <p>Currently using {language}</p>
        {/**The fricking code runner  */}
        <div
          onClick={runCode}
          className="px-4 text-[1.1rem] hover:bg-gray-800 rounded-md py-1 cursor-pointer"
        >
          <IoPlayOutline />
        </div>
      </div>

      <div
        style={{ height: `calc(95vh - ${bottomBarHeight}px - 4px)` }}
        className="flex "
      >
        <div
          className=""
          style={{
            width: `${sideBarWidth}px`,
          }}
        >
          This is reserved for sidebar only yeah
        </div>
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
          onChange={(val) => setCode(val || "")}
        />
      </div>
      <div
        onMouseDown={startBottomChange}
        className="hover:h-[6px] h-1  hover:cursor-row-resize border-gray-700 border-t-1
         hover:bg-blue-500"
      ></div>
      <div
        style={{
          height: bottomBarHeight,
        }}
        className=" overflow-y-auto font-[50] text-[.9rem] px-4   bg-gray-900 "
      >
        output:
        <p className="text-green-400 px-[10vw] text-[.7rem] whitespace-pre-wrap ">
          {output}
        </p>
      </div>
    </div>
  );
};

export default CodeEditor;
