/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import anh1 from "@/../public/anh1.webp";

interface IPOST {
  id?: string;
  title?: string;
  desc?: string;
  img?: string;
  content?: string;
  username?: string | null;
  categories?: string;
}

const DashboardPage = () => {
  const session = useSession();
  const [data, setData] = useState<IPOST>({
    id: "",
    title: "",
    desc: "",
    img: "",
    content: "",
    categories: "",
  });
  
  const [getPost, setGetPost] = useState([]);
  const [openBtnUpdate, SetOpenbtnUpdate] = useState(false);
  const getAllPost = async () => {
    const staticData = await fetch(`http://localhost:3000/api/posts`);
    const result = await staticData.json();
    setGetPost(result);
  };
  const getDetailPost = async (id: string) => {
    const staticData = await fetch(`http://localhost:3000/api/posts/${id}`, {
      cache: "force-cache",
    });
    return await staticData.json();
  };
  useEffect(() => {
    getAllPost();
  }, []);

  if (session.status === "unauthenticated") {
    return notFound();
  }

  const handleSubmit = async () => {
    const resData = await fetch("http://localhost:3000/api/posts", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        username: session.data?.user?.name,
      }),
    });
    if (resData.ok) {
      setData({
        title: "",
        desc: "",
        img: "",
        content: "",
        categories: "",
      });
      getAllPost();
    }
  };

  const handleDelete = async (id: string) => {
    const resData = await fetch(`http://localhost:3000/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        username: session.data?.user?.name,
      }),
    });
    if (resData.ok) {
      getAllPost();
    }
  };

  const handleDetailPosts = async (id: string) => {
    const detail = await getDetailPost(id);
    setData({
      id: detail?._id,
      title: detail?.title,
      desc: detail?.desc,
      img: detail?.img,
      content: detail?.content,
      categories: detail?.categories,
    });
    SetOpenbtnUpdate(true);
  };

  const handleUpdatePosts = async () => {
    const resData = await fetch(`http://localhost:3000/api/posts/${data.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        username: session.data?.user?.name,
      }),
    });
    if (resData.ok) {
      setData({
        title: "",
        desc: "",
        img: "",
        content: "",
        categories: "",
      });
      getAllPost();
      SetOpenbtnUpdate(false);
    }
  };

  return (
    <div className="max-w-[1300px] mx-auto px-6 xl:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="mt-20 h-[600px]  overflow-y-auto md:mr-12 bg-neutral-950">
          {getPost?.map((item: any) => (
            <div key={item._id} className="px-7 my-2">
              <div
                className="flex bg-teal-900 mb-4 rounded-md relative items-center"
                key={item._id}
              >
                <Image
                  src={item.img || anh1}
                  alt="photo"
                  width={150}
                  height={150}
                />
                <div className="flex">
                  <div className="pl-5 ">
                    <h1 className="text-2xl ml-5 font-medium bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent leading-[40px]">
                      {item.title}
                    </h1>
                    <p
                      className="text-sm text-gray-400 mb-4"
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 4,
                        overflow: "hidden",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                  <div className="w-[100px]">
                    <TiDelete
                      className="absolute right-2 top-2 text-[23px]"
                      onClick={() => handleDelete(item._id)}
                    />
                    <FaRegEdit
                      className="absolute right-2 bottom-2 text-[19px]"
                      onClick={() => handleDetailPosts(item._id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-6 mt-10 mb-5 lg:mb-0 w-[450px] mx-auto">
          <h1 className="text-[35px] text-center font-medium bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent leading-[40px]">
            Add Blogs
          </h1>
          <div>
            <p className="text-base text-gray-400 mb-2 ml-2">Title</p>
            <Input
              value={data.title}
              className="ring-2 ring-gray-600"
              placeholder="Enter title"
              onChange={(e) =>
                setData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div>
            <p className="text-base text-gray-400 mb-2 ml-2">Url Image</p>
            <Input
              value={data.img}
              className="ring-2 ring-gray-600"
              placeholder="Enter image"
              onChange={(e) =>
                setData((prev) => ({ ...prev, img: e.target.value }))
              }
            />
          </div>
          <div>
            <p className="text-base text-gray-400 mb-2 ml-2">Category</p>
            <Input
              value={data.categories}
              className="ring-2 ring-gray-600"
              placeholder="Enter category"
              onChange={(e) =>
                setData((prev) => ({ ...prev, categories: e.target.value }))
              }
            />
          </div>
          <div>
            <p className="text-base text-gray-400 mb-2 ml-2">Content</p>
            <Input
              value={data.content}
              className="ring-2 ring-gray-600"
              placeholder="Enter content"
              onChange={(e) =>
                setData((prev) => ({ ...prev, content: e.target.value }))
              }
            />
          </div>
          <div>
            <p className="text-base text-gray-400 mb-2 ml-2">Description</p>
            <Input
              value={data.desc}
              className="ring-2 ring-gray-600"
              placeholder="Enter description"
              onChange={(e) =>
                setData((prev) => ({ ...prev, desc: e.target.value }))
              }
            />
            <div className="mt-8 flex justify-center">
              <Button
                className="w-[150px] text-lg font-medium"
                onClick={() => handleSubmit()}
              >
                Submit
              </Button>
              {openBtnUpdate && (
                <Button
                  className="w-[150px] text-lg font-medium ml-7 bg-pink-500 text-white"
                  onClick={() => handleUpdatePosts()}
                >
                  Update
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
