import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/Google";

import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "@/utils/db";
import User from "@/app/model/User";
import bcrypt from "bcryptjs";
import GithubProvider from "next-auth/providers/github";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDb();
        try {
          const user = await User.findOne({ email: credentials?.email });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials?.password || "",
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Invalid email or password");
            }
          } else {
            throw new Error("No user found with this email");
          }
        } catch (error) {
          console.log(error);
          throw new Error("Internal server error");
        }
      },
    }),
  ],
  debug: true,
};

const handler = async (req: any, res: any) => {
  return await NextAuth(req, res, authOptions);
};

export const GET = handler;
export const POST = handler;
