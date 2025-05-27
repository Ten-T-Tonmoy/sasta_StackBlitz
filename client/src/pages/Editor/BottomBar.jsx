import React from "react";

const BottomBar = ({ output, bottomBarHeight }) => {
  return (
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
  );
};

export default BottomBar;
