import { notFound } from "next/navigation";

export const getData = async (page: Number = 1, limit: Number = 10) => {
  const staticData = await fetch(
    `http://localhost:3000/api/posts?page=${page}&limit=${limit}`
  );
  if (!staticData.ok) {
    return notFound();
  }
  const result = await staticData.json();
  return result;
};

export const getCategories = async (name: string) => {
  const staticData = await fetch(
    `http://localhost:3000/api/list-categories?name=${name}`
  );
  if (!staticData.ok) {
    throw new Error("Get categories fail");
  }
  const result = await staticData.json();
  return result;
};

export const createComments = async (
  postId: string | string[],
  username: string | null | undefined,
  content: string | undefined
) => {
  const resData = await fetch("http://localhost:3000/api/comment", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId,
      username,
      content,
    }),
  });
  if (!resData.ok) {
    throw new Error("Create comment fail");
  }
  const result = await resData.json();
  return result;
};

export const getComments = async (idPost: string | string[]) => {
  const staticData = await fetch(`http://localhost:3000/api/comment/${idPost}`);
  if (!staticData.ok) {
    throw new Error("Get comment fail");
  }
  const result = await staticData.json();
  return result;
};

export const DeleteComment = async (postId: string | string[]) => {
  const resData = await fetch(`http://localhost:3000/api/comment/${postId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!resData.ok) {
    throw new Error("Create comment fail");
  }
  const result = await resData.json();
  return result;
};
