import React from "react";
import toast from "react-hot-toast";

export default function UnderConstruction() {
  const checkOk = () => {
    toast.success("React Toast and Router going smooth");
  };
  return (
    <div
      className="flex items-center justify-center
     py-10  px-4"
    >
      {" "}
      <div
        className="bg-white  md:w-[70vw] rounded-md shadow-xl
        p-8 max-w-md text-center"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🚧 Under Construction
        </h1>
        <p className="text-gray-600 mb-6">
          This page is currently being built.<br></br>Stay tuned <br />
          Move to another page kindly
        </p>
        <button
          onClick={checkOk}
          className="inline-block cursor-pointer px-4 py-2 bg-yellow-100
         text-yellow-800 rounded-full text-sm font-medium"
        >
          Dev Only Click to Check
        </button>
      </div>
    </div>
  );
}
