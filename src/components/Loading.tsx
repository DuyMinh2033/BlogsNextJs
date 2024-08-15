import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <BiLoaderCircle className="animate-spin" size={64} />
    </div>
  );
};

export default Loading;
