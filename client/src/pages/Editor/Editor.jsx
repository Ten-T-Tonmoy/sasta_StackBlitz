import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

import { IoPlayOutline } from "react-icons/io5";

const CodeEditor = () => {
  const [language, setLanguage] = useState("cpp");
  const [theme, setTheme] = useState("vs-dark");

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
  return (
    <div className="">
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

      <div className="flex">
        <div className="w-20vw">This is reserved for sidebar only yeah</div>
        <Editor
          width="80vw"
          height="75vh"
          language={language}
          value={code}
          theme={theme}
          onChange={(val) => setCode(val || "")}
        />
      </div>
      <div className="h-[20vh] overflow-y-auto font-[50] text-[.9rem] px-4 py-1  bg-gray-900 ">
        output:
        <p className="text-green-400 whitespace-pre-wrap ">{output}</p>
      </div>
    </div>
  );
};

export default CodeEditor;
