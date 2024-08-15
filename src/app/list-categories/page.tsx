import { getCategories } from "@/app/fetchData/fetchData";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import anh1 from "@/../public/anh1.webp";
const ListCategories = async ({
  searchParams,
}: {
  searchParams: { name: string };
}) => {
  const data = await getCategories(searchParams.name);

  return (
    <div className="max-w-[1220px] mx-auto mb-14 px-7 xl:px-0">
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
    </div>
  );
};

export default ListCategories;

export async function generateMetadata() {
  return {
    title: "Categories",
    description: "duyminhdev",
  };
}
