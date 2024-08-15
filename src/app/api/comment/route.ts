import Comments from "@/app/model/Comments";
import connectDb from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { ...data } = await req.json();
    await connectDb();
    const comments = await Comments.create(data);

    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

