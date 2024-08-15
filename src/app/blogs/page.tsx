import React from "react";
import BlogsList from "@/components/BlogsList";

export async function generateMetadata() {
  return {
    title: "Blogs",
    description: "duyminhdev",
  };
}
const BlogsPage = async () => {
  return (
    <div className="max-w-[1220px] mx-auto mb-14 px-7 xl:px-0 min-h-[calc(100vh-100px)]">
      <BlogsList />
    </div>
  );
};

export default BlogsPage;
