import connectDb from "@/utils/db";
import Posts from "../../model/Post";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("name");
    const posts = await Posts.find({ categories: { $in: [category] } });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
