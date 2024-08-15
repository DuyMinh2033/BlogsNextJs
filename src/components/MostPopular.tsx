import React from "react";

const MostPopular = () => {
  return (
    <>
      <div>
        <p className=" text-gray-400 text-sm">What is hot?</p>
        <h1 className="font-medium text-2xl">Most Popular</h1>
        <div>
          <button className="bg-[#FF69B4] text-white text-base px-4 py-2 rounded-3xl mt-6 mb-3">
            Travel
          </button>
          <p className="text-sm text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
            incidunt quisquam esse culpa vitae.
          </p>
        </div>

        <div>
          <button className="bg-[#b58b30] text-white text-base px-4 py-2 rounded-3xl mt-6 mb-3">
            Coding
          </button>
          <p className="text-sm text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
            incidunt quisquam esse culpa vitae.
          </p>
        </div>

        <div>
          <button className="bg-[#5f1daf] text-white text-base px-4 py-2 rounded-3xl mt-6 mb-3">
            Football
          </button>
          <p className="text-sm text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
            incidunt quisquam esse culpa vitae.
          </p>
        </div>
      </div>
      <div className="hidden xl:block mt-5">
        <p className="text-gray-400 text-sm mb-1">Discover by topic</p>
        <h1 className="font-medium text-2xl">Categories</h1>
        <div className="flex flex-wrap justify-between">
          <button className="bg-[#BC8F8F] text-black text-base px-4 py-2 rounded-xl mt-6 mb-3">
            Coding
          </button>
          <button className="bg-[#C71585] text-black text-base px-4 py-2 rounded-xl mt-6 mb-3">
            Write
          </button>
          <button className="bg-[#6A5ACD] text-black text-base px-4 py-2 rounded-xl mt-6 mb-3">
            Reading
          </button>
          <button className="bg-[#696969] text-black text-base px-4 py-2 rounded-xl mt-6 mb-3">
            Football
          </button>
          <button className="bg-[#9370DB] text-black text-base px-4 py-2 rounded-xl mt-6 mb-3">
            Tennis
          </button>
          <button className="bg-[#00FFFF] text-black text-base px-4 py-2 rounded-xl mt-6 mb-3">
            Swimming
          </button>
        </div>
      </div>
    </>
  );
};

export default MostPopular;
