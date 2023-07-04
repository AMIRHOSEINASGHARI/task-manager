import User from "@/models/user";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        // ------------------------------------------------------CONNECTING TO DATA BASE FUNCTION
        try {
          await connectDB();
        } catch (error) {
          throw new Error("Cannot connect to data base!");
        }
        // ------------------------------------------------------USER EXISTANCE
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found!");
        }
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
          throw new Error("Username or password is incorrect!");
        }
        return { email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
