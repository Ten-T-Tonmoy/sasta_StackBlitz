import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const CodeEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");

  const [code, setCode] = useState("// set back relax and kaboom!");
  const [output, setOutput] = useState("");

  const runCode = async () => {
    const res = await axios.post("http://localhost:3000/execute", {
      code,
      language,
    });

    setOutput(res.data.output);
  };
  return (
    <div className="">
      <div
        className="
      h-[5vh] bg-gray-900 text-center text-[.8rem]"
      >
        Currently using {language}
      </div>
      <div className="flex">
        <div className="w-20vw">This is reserved for sidebar</div>
        <Editor
          width="80vw"
          height="75vh"
          defaultLanguage={language}
          defaultValue={code}
          theme={theme}
          onChange={(val) => setCode(val || "")}
        />
      </div>
      <div className="h-[20vh] font-[50] text-[.9rem] px-4 py-1  bg-gray-900 ">
        output:
      </div>
    </div>
  );
};

export default CodeEditor;
