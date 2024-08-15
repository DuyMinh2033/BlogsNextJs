"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const WritePage = () => {
  const [value, setValue] = useState("");
  return (
    <div className="max-w-[1220px] mx-auto h-[calc(100vh-300px)] mt-10">
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  );
};

export default WritePage;
