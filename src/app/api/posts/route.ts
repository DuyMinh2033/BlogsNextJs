import { NextResponse } from "next/server";
import connectDb from "@/utils/db";
import Posts from "../../model/Post";
export const GET = async (req: Request) => {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "80", 10);
    const posts = await Posts.find()
      .limit(limit)
      .skip((page - 1) * limit);
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { ...data } = await req.json();
    console.log(data);
    await connectDb();
    const posts = await Posts.create(data);
    console.log(JSON.stringify(posts));
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
