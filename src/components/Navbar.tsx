"use client";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { SlMenu } from "react-icons/sl";

const links = [
  {
    id: 2,
    title: "About",
    url: "/about",
  },
  {
    id: 3,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 4,
    title: "Blogs",
    url: "/blogs",
  },
  {
    id: 5,
    title: "Profile",
    url: "/profile",
  },
];

const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  const [openModal, SetOpenModal] = useState<Boolean>(false);

  return (
    <div className="h-[80px]  max-w-[1220px] mx-auto border-b-2 border-b-slate-200   dark:border-b-white/10 flex items-center justify-between relative">
      <Link href={"/"}>
        <h1 className="ml-5 xl:ml-0 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-medium text-[23px] leading-[70px]">
          TDM STORE
        </h1>
      </Link>
      <div className="hidden xl:flex items-center">
        {links.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            className="px-5 text-[18px] font-normal"
          >
            {item.title}
          </Link>
        ))}
        {session.status === "authenticated" && (
          <Link href={"dashboard"} className="px-5 text-[18px] font-normal">
            Dashboard
          </Link>
        )}
        <ModeToggle />
        {session.status === "authenticated" ? (
          <Button
            className="rounded-full px-8 text-[16px] ml-4"
            onClick={() => signOut()}
          >
            Logout
          </Button>
        ) : (
          <Button
            className="rounded-full px-8 text-[16px] ml-4"
            onClick={() => router.push("/dashboard/login")}
          >
            Login
          </Button>
        )}
      </div>
      <div className="px-6 xl:hidden">
        <SlMenu
          className="cursor-pointer"
          size={26}
          onClick={() => SetOpenModal((prev) => !prev)}
        />
      </div>
      {openModal && (
        <div className="absolute bg-[rgb(17,27,54)] top-20 left-0 right-0 h-screen flex flex-col items-center">
          {links.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className="px-5 text-[18px] font-normal mt-4"
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
