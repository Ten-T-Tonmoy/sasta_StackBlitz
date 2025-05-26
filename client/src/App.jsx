import React from "react";
import { Link, Routes, Route } from "react-router-dom";

import DevCheck from "./pages/DevCheck/DevCheck";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Editor from "./pages/Editor/Editor";

import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<DevCheck />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </div>
  );
};

export default App;
