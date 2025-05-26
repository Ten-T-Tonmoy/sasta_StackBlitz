import React from "react";
import { Link } from "react-router-dom";
import UnderConstruction from "./UnderConstruction";

const DevCheck = () => {
  return (
    <>
      <div className="flex bg-stone-850  flex-col justify-center items-center">
        <div
          className="
        bg-gradient-to-br from-primary via-error to-secondary
        p-2   m-10
        rounded-md 
        text-white text-center text-[3rem]
        "
        >
          Dev test Page
        </div>

        <h1 className="p-4">Available Pages :</h1>

        <div className="flex gap-2 ">
          <Link to="/home">
            <div>
              <button className="btn btn-primary">Home</button>
            </div>
          </Link>

          <Link to="/editor">
            <div>
              <button className="btn btn-primary">Code Editor</button>
            </div>
          </Link>
        </div>
        <UnderConstruction />
      </div>
    </>
  );
};

export default DevCheck;
