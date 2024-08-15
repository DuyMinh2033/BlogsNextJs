/* eslint-disable @next/next/no-img-element */
"use client";
import { getData } from "@/app/fetchData/fetchData";
import Categories from "@/components/Categories";
import Loading from "@/components/Loading";
import RecentPosts from "@/components/RecenPosts";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 5;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getData(page, limit);
      setLoading(false);
      setData(result);
    };
    fetchData();
  }, [page]);

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <>
      <div className="max-w-[1220px] mx-auto flex items-center">
        <h1></h1>
        <div className="mt-10 grid grid-col-1 gap-3 lg:grid-cols-2">
          <div className="px-8">
            <Image
              src="https://media.istockphoto.com/id/616902766/photo/dedicated-to-software-development.jpg?b=1&s=612x612&w=0&k=20&c=dfzaMQnbEesVty876aIgw3b-J1GFPBpbpkldC_GRR8Y="
              alt="image"
              className="w-full object-center rounded-md"
              height={500}
              width={500}
            />
          </div>
          <div className=" flex flex-col items-center justify-center px-9 gap-6 mb-7 lg:mb-0 lg:px-0">
            <p className="text-5xl text-center font-medium bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent leading-[70px] p-0">
              Next.js Full Tutorial <br />
              for Beginners App Router
            </p>
            <p className="text-gray-500 text-base">
              I hardly ever comment on tutorials, but DAMN!! Your explanation is
              beautiful, on-point and so easy to follow and understand. It feels
              illegal to see this free. Thank you so much for being such a kind
              human being and sharing these projects,only 30 minutes in and I
              can already see myself learning so much after finishing it. Thank
              You.
            </p>
            <Link href={"/blogs"}>
              <Button className=" px-8 text-[20px]">See now!</Button>
            </Link>
          </div>
        </div>
      </div>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <Categories data={data} />
          <RecentPosts
            data={data}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />{" "}
        </>
      )}
    </>
  );
}
