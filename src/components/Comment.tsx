"use client";
import {
  createComments,
  DeleteComment,
  getComments,
} from "@/app/fetchData/fetchData";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const Comments = () => {
  const [value, setValue] = useState("");
  const [dataComments, setDataComments] = useState([]);
  const params = useParams();
  const PostsId = params.id as string | string[];
  const session = useSession();
  const username = session.data?.user?.name;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const getData = async () => {
    setLoading(true);
    const dataComments = await getComments(PostsId);
    setDataComments(dataComments);
    setLoading(false);
  };

  useEffect(() => {
    if (PostsId) {
      getData();
    }
  }, [PostsId]);
  const handleSend = async () => {
    console.log(window.location.href);
    if (session.status === "unauthenticated") {
      router.push(
        `/dashboard/login?callbackUrl=${encodeURIComponent(
          window.location.href
        )}`
      );
    } else {
      if (value !== "") {
        const result = await createComments(PostsId, username, value);
        if (result) {
          getData();
          setValue("");
        }
      }
    }
  };
  const handleDelete = async (idComment: string) => {
    const result = await DeleteComment(idComment);
    if (result) {
      getData();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <div className="mt-4">
      <h1 className="text-3xl font-semibold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
        Comments
      </h1>
      <div className="flex items-center mt-5">
        <textarea
          value={value}
          placeholder="Write a comment..."
          className="bg-white flex-1 px-2 py-1"
          onChange={(e) => setValue(e.target.value)}
        />
        <Button className="bg-green-600 ml-5" onClick={handleSend}>
          {loading ? "loading..." : "Send"}
        </Button>
      </div>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        dataComments.map((comment: any) => (
          <div
            className="flex flex-col mt-4 gap-2 w-full pr-24"
            key={comment._id}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
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
                  <p>{comment?.username}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
              </div>
              <AiOutlineDelete
                className="text-red-500 cursor-pointer"
                size={20}
                onClick={() => handleDelete(comment._id)}
              />
            </div>
            <p>{comment?.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;
