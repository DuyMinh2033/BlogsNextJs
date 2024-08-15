"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

export interface IDataUser {
  name?: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState<IDataUser>({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleSubmit = async () => {
    const resData = await fetch("http://localhost:3000/api/register", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!resData.ok) {
      setMessage("Something wrong");
    } else setMessage("");
    resData.status === 200 && router.push("/");
  };
  return (
    <div className="max-w-[1300px] h-[calc(100vh-100px)] mx-auto flex justify-center items-center">
      <div className="w-[300px]">
        <div className="flex flex-col gap-6">
          <div>
            <p className="mb-3  ml-1">Username</p>
            <Input
              placeholder="Your name"
              className="ring-2 ring-gray-600"
              onChange={(e) =>
                setData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
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
          <div className="">
            <p className="mb-3 ml-1">Password</p>
            <Input
              placeholder="Your Password"
              className="ring-2 ring-gray-600"
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <div className="mt-3 flex justify-between">
              <Link
                href={"login"}
                className="text-sm text-blue-500 cursor-pointer  block"
              >
                Go to back login
              </Link>
              {message !== "" ? (
                <p className="text-sm text-red-500">{message}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              className="w-1/2 rounded-3xl"
              onClick={() => handleSubmit()}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
