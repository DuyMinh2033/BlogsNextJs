import Comments from "@/app/model/Comments";
import connectDb from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { idPost: string } }
) => {
  try {
    await connectDb();
    const comments = await Comments.find({ postId: params.idPost });
    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { idPost: string } }
) => {
  try {
    await connectDb();
    const comments = await Comments.findByIdAndDelete({
      _id: params.idPost,
    });
    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
