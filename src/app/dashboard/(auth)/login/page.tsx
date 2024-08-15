/* eslint-disable @next/next/no-img-element */
"use client";
import { IDataUser } from "@/app/dashboard/(auth)/register/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoLogoGithub } from "react-icons/io";

const LoginPage = () => {
  const [data, setData] = useState<IDataUser>({
    email: "",
    password: "",
  });
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  console.log(searchParams.get("callbackUrl"));
  const handleSubmit = () => {
    signIn("credentials", { email: data.email, password: data.password });
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push(
        callbackUrl ? decodeURIComponent(callbackUrl as string) : "/"
      );
    }
  }, [status, callbackUrl, router]);

  return (
    <div className="max-w-[1300px] h-[calc(100vh-100px)] mx-auto flex justify-center items-center">
      <div className="w-[300px]">
        <div className="flex flex-col gap-5">
          <div>
            <p className="mb-3  ml-1">Email</p>
            <Input
              placeholder="Your Email"
              className="ring-2 ring-gray-600"
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col">
            <p className="mb-3 ml-1">Password</p>
            <Input
              placeholder="Your Email"
              className="ring-2 ring-gray-600"
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <Link
              href={"register"}
              className="text-sm text-blue-500 cursor-pointer block mt-2"
            >
              Don't you have account?
            </Link>
          </div>
          <div className="flex justify-center">
            <Button className="w-full rounded-sm" onClick={handleSubmit}>
              Login
            </Button>
          </div>
          <div className="flex items-center">
            <div className="border-b-2 border-b-white/35 w-full" />
            <p className="mx-2">or</p>
            <div className="border-b-2 border-b-white/35 w-full" />
          </div>
          <div className="flex">
            <Button
              onClick={() => signIn("google")}
              className="bg-transparent ring-2 ring-gray-400 text-black dark:text-white hover:bg-opacity-100 hover:text-black flex w-1/2"
            >
              <img
                src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                alt="Logo"
                className="h-[25px] mr-2"
              />
              Google
            </Button>
            <div className="mx-3"></div>
            <Button
              onClick={() => signIn("github")}
              className="bg-transparent ring-2 ring-gray-400 text-black dark:text-white hover:bg-opacity-100 hover:text-black flex w-1/2"
            >
              <IoLogoGithub size={25} className="mr-2" />
              Github
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
