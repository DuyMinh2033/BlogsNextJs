import { NextResponse } from "next/server";
import connectDb from "@/utils/db";
import Posts from "@/app/model/Post";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDb();
    console.log(params.id);
    if (!params.id) return new NextResponse("Error", { status: 500 });
    const post = await Posts.findById({ _id: params.id });
    const json = JSON.stringify(post);
    console.log("dât", json);
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDb();
    if (!params.id) return new NextResponse("Error ID DELETE", { status: 500 });
    await Posts.findByIdAndDelete({ _id: params.id });

    return new NextResponse("Delete Posts Success", { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { ...data } = await req.json();
    console.log(data);
    await connectDb();
    if (!params.id) return new NextResponse("Error ID UPDATE", { status: 500 });
    await Posts.findByIdAndUpdate(params.id, data);
    return new NextResponse("UPDATE Posts Success", { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
