import User from "@/models/user";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  //****/   connecting to data base function   /****//
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", message: "Cannot connect to data base" });
  }
  if (req.method === "GET") {
    const {
      user: { email },
    } = await getSession({ req });
    const user = await User.findOne({ email });
    res.status(200).json({
      data: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        todos: user.todos,
        id: user._id,
      },
      status: "success",
    });
  } else {
    return;
  }
}
