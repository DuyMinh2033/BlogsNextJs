import React from "react";
import anh1 from "../../../../public/anh1.webp";
import Image from "next/image";
import MostPopular from "@/components/MostPopular";
import Comments from "@/components/Comment";
const getData = async (id: string) => {
  if (id) {
    const staticData = await fetch(`http://localhost:3000/api/posts/${id}`);
    return await staticData.json();
  } else {
    return null;
  }
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const data = await getData(params?.id);
  return {
    title: data.title,
    description: data.desc,
    openGraph: {
      title: "Blog",
      images: [
        "https://p16-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/e727eed3e2919c8b14df51a6955791f5~c5_720x720.jpeg?lk3s=a5d48078&nonce=97056&refresh_token=e6b505f46136bf234d9465b5d955416f&x-expires=1723172400&x-signature=p%2FtU19x3nYWzOgJOmXtLSWLK4Yo%3D&shp=a5d48078&shcp=81f88b70",
      ],
    },
  };
}
const BlogId = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data = await getData(id);

  return (
    <div className="max-w-[1220px] mx-auto mt-10">
      <div className="grid px-7 grid-cols-1 gap-6 lg:grid-cols-2 xl:px-0">
        <div className="flex flex-col items-center justify-between">
          <h1 className="font-medium leading-snug  bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent text-4xl">
            {data.title}
          </h1>
          <div className="flex items-center justify-start w-full">
            <Image
              src={
                "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
              width={100}
              height={100}
              quality={100}
              alt="Avatar"
              className="h-9 w-9 rounded-full"
            />

            <div className="ml-3 text-slate-200">
              <p>John China</p>
              <p>01.01.2024</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src={data.img || anh1}
            width={500}
            height={500}
            alt="Photo"
            className="h-[300px] w-full object-center rounded-sm"
          />
        </div>
      </div>
      <div className="flex w-full mt-7 px-7 xl:px-0">
        <div className="mt-3  text-gray-500 lg:w-3/4">
          {data.desc}
          <Comments />
        </div>
        <div className="hidden lg:block w-1/4 ml-10">
          <MostPopular />
        </div>
      </div>
    </div>
  );
};

export default BlogId;
