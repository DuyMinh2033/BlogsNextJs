
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IPops {
  data: string[];
}

const Categories: React.FC<IPops> = ({ data }) => {
  const categories = data.map((post: any) => post.categories).flat();
  const uniqueCategories = categories.filter((item, index) => {
    return categories.indexOf(item) === index;
  });
  const limitedCategories = uniqueCategories.slice(0, 5);
  const colors = [
    "#40E0D0",
    "#FFC0CB",
    "#6A5ACD",
    "#1E90FF",
    "#B0C4DE",
    "#FF6347",
    "#FFD700",
    "#98FB98",
    "#FF69B4",
    "#FFB6C1",
  ];

  const imgCate = [
    "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1261427/pexels-photo-1261427.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/574080/pexels-photo-574080.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/574069/pexels-photo-574069.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  return (
    <div className="max-w-[1220px] mx-auto mt-12">
      <h1 className="text-4xl font-medium bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-5 px-5 xl:px-0">
        Category
      </h1>
      <div className="grid grid-cols-3 px-5 gap-5 xl:grid-cols-5 xl:gap-12 xl:px-0">
        {limitedCategories.map((item, index) => (
          <Link href={`/list-categories?name=${item}`} key={item}>
            <div
              className="rounded-md w-full h-20 cursor-pointer"
              style={{ backgroundColor: colors[index % colors.length] }}
            >
              <div className="flex items-center h-full justify-center">
                <Image
                  src={`${imgCate[index % imgCate.length]}`}
                  width={100}
                  height={100}
                  quality={100}
                  alt="Avatar"
                  className="h-9 w-9 rounded-full object-center"
                />
                <h3 className="ml-2 text-black">{item}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
