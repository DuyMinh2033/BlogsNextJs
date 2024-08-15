import connectDb from "@/utils/db";
import { NextResponse } from "next/server";
import User from "../../model/User";
import bcrypt from "bcryptjs";
export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return new NextResponse(JSON.stringify({ message: "Invalid Register" }), {
        status: 400,
      });
    }

    await connectDb();
    const hash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hash,
    });
    return new NextResponse("Create User Successfully", { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
