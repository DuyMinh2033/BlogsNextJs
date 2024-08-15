"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import anh1 from "@/../public/anh1.webp";
import { getData } from "@/app/fetchData/fetchData";
import { Button } from "@/components/ui/button";

const BlogsList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const data = await getData(page, limit);
      setLoading(false);
      setData(data);
    };
    getPosts();
  }, [page]);

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
  };
  return (
    <>
      {data?.map((item: any) => (
        <Link href={`blogs/${item._id}`} key={item.id}>
          <div className="flex flex-col justify-center gap-6 lg:flex-row mt-8">
            <Image
              src={item.img || anh1}
              width={300}
              height={100}
              alt={"Photo"}
              className="w-full rounded-md h-[350px] object-center my-auto sm:w-1/3"
            />
            <div className="flex flex-col gap-3 w-full sm:w-2/3">
              <h1 className="text-center font-medium leading-snug  bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent text-5xl">
                {item.title}
              </h1>
              <p className="text-[18px] text-gray-500 px-7">{item.desc}</p>
            </div>
          </div>
        </Link>
      ))}
      <div className="mt-10 flex justify-center">
        <Button className="px-5" onClick={() => handlePrev()}>
          Prev
        </Button>
        <Button
          className="ml-5 px-5 bg-pink-500 text-white hover:bg-pink-700"
          onClick={() => handleNext()}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default BlogsList;
