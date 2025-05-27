import React from "react";
import { useDispatch } from "react-redux";
import { setTheme, setLanguage } from "../../services/editorSlice";

import { IoPlayOutline } from "react-icons/io5";

const TopBar = ({ runCode, language, theme }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="
      h-[5vh] bg-gray-900 items-center flex justify-between text-[.8rem]"
    >
      {" "}
      <div className="flex">
        <select
          className="cursor-pointer px-1 hover:bg-gray-800 p-1 "
          value={language}
          onChange={(e) => dispatch(setLanguage(e.target.value))}
        >
          <option value="javascript">JavaScript</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
        </select>
        <select
          className="cursor-pointer px-2 hover:bg-gray-800 p-1 "
          value={theme}
          onChange={(e) => dispatch(setTheme(e.target.value))}
        >
          <option value="vs-dark">Vs Dark</option>
          <option value="hc-black">High Contrast</option>
          <option value="vs">Vs Light</option>
        </select>
      </div>
      <p>Currently using {language}</p>
      {/**The fricking code runner  */}
      <div
        onClick={runCode}
        className="px-4 text-[1.1rem] hover:bg-gray-800 rounded-md py-1 cursor-pointer"
      >
        <IoPlayOutline />
      </div>
    </div>
  );
};

export default TopBar;
