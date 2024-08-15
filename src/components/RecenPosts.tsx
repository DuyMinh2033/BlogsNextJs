/* eslint-disable @next/next/no-async-client-component */
import MostPopular from "@/components/MostPopular";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IPops {
  data: string[];
  handleNext: () => void;
  handlePrev: () => void;
}

const RecentPosts: React.FC<IPops> = ({ data, handleNext, handlePrev }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const textColor = [
    "from-pink-500 to-gray-500",
    "from-red-500 to-blue-500",
    "from-green-500 to-yellow-500",
  ];

  return (
    <div className="max-w-[1220px] mx-auto mt-12 mb-7 px-7 xl:px-0">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-gray-500 bg-clip-text text-transparent leading-[50px]">
        Recent Posts
      </h1>
      <div className="flex w-full mt-5">
        <div className="w-full lg:w-3/4">
          {data.length === 0 ? (
            <p className="text-red-600 text-center text-xl">No more</p>
          ) : (
            data?.map((item: any, index) => (
              <div
                className="grid grid-cols-1 mt-6 sm:grid-cols-2 gap-5 lg:flex items-center"
                key={item._id}
              >
                <Image
                  src={
                    item?.img ||
                    "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                  width={500}
                  height={500}
                  quality={100}
                  alt="Photo"
                  className="w-[400px]"
                />
                <div className="px-5">
                  <div className="flex items-center">
                    <p className="text-gray-500 text-sm">
                      {formatDate(item.createdAt)} -
                    </p>
                    <p className="text-red-700 text-base ml-1">Culture</p>
                  </div>
                  <div className="flex flex-col lg:mt-3">
                    <h1
                      className={`text-3xl font-bold bg-gradient-to-r ${
                        textColor[index % textColor.length]
                      } bg-clip-text text-transparent leading-[40px]`}
                    >
                      {item.title}
                    </h1>
                    <p
                      className="text-base text-gray-500"
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 4,
                        overflow: "hidden",
                      }}
                    >
                      {item.desc}
                    </p>
                    <Link
                      href={`/blogs/${item._id}`}
                      className="font-normal mt-2 cursor-pointer"
                    >
                      Read More
                    </Link>
                    <p className="border-b-2 border-b-yellow-500 w-20"></p>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="mt-10 flex justify-center">
            <Button className="px-5" onClick={handlePrev}>
              Prev
            </Button>
            <Button
              className="ml-5 px-5 bg-pink-500 text-white hover:bg-pink-700"
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </div>
        <div className="hidden lg:block lg:mr-5 w-1/4">
          <MostPopular />
        </div>
      </div>
    </div>
  );
};

export default RecentPosts;
