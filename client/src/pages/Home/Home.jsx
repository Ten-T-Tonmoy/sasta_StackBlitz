import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import Typewriter from "typewriter-effect";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const Home = () => {
  const [req, setReq] = useState("");
  const [userMsg, setUserMsg] = useState([""]);
  const [res, setRes] = useState("");
  const [thinking, setThinking] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!res) return;
    setTyped("");

    let index = 0;
    const interval = setInterval(() => {
      setTyped((prev) => prev + res.charAt(index));
      index++;
      if (index >= res.length) clearInterval(interval);
    }, 10);

    return () => clearInterval(interval);
  }, [res]);

  const submitHandler = async () => {
    toast.success("The message was sent.. Wait!");
    setReq("");
    if (req.trim() !== "") setThinking(true);
    const result = await axios.post("http://localhost:3000/api/chat", {
      message: req,
    });
    const data = result.data; //bruh ja dimu ta i to extract kormu
    console.log(data);
    setRes(data.response);
    setThinking(false);
  };
  return (
    <div className="flex py-2 w-full flex-col justify-center">
      <Link to="/">
        <div className="text-center">
          <button className="btn btn-primary">Go Back to DevCheck</button>
        </div>
      </Link>
      <div className="w-full flex justify-center">
        <SlideIn />
      </div>
      <div className="justify-center p-3 gap-1 flex">
        <input
          value={req}
          onChange={(val) => setReq(val.target.value)}
          type="text "
          className="input input-secondary"
        />
        <button onClick={submitHandler} className="btn btn-secondary">
          Send ✅
        </button>
      </div>
      {thinking && (
        <div className="flex justify-center gap-10 text-primary p-2">
          <div>Ai is thinking </div>
          <span className="loading loading-spinner "></span>
        </div>
      )}
      <div
        className=" bg-gray-950 text-start
      rounded-md p-4 mx-4 my-2 "
      >
        <h1 className="text-white  text-[1.2rem] py-2">Result :</h1>
        <div className="">
          <ReactMarkdown
            rehypePlugins={[rehypeHighlight]}
            components={{
              code: ({ node, inline, className, children, ...props }) =>
                inline ? (
                  <code
                    className="bg-gray-800 text-white px-1 py-0.5 my-1 rounded text-sm"
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <pre
                    className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto"
                    {...props}
                  >
                    <code className="text-sm">{children}</code>
                  </pre>
                ),

              h1: ({ node, ...props }) => (
                <h1 className="text-3xl font-bold my-4 p-1" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-2xl font-semibold my-3" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="text-base leading-7 my-3" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-6 my-2" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-6 my-2" {...props} />
              ),
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,

              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-gray-500 pl-4 italic text-gray-400"
                  {...props}
                />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                  {...props}
                />
              ),
            }}
          >
            {typed}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Home;

const SlideIn = () => {
  return (
    <motion.div
      initial={{ x: -500 }}
      animate={{ x: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        ease: "easeInOut",
        duration: 20,
      }}
    >
      <p className="py-2">Type shii and get Started! </p>
    </motion.div>
  );
};
