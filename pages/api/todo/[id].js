import User from "@/models/user";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "../auth/[...nextauth]";

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
  //****/   checking token existance   /****//
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }
  //****/   checking user existance   /****//
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not Signed up yet!" });
  }
  const id = req.query.id;
  const { title, des } = req.body;
  const todo = await user.todos.find((todo) => String(todo._id) === String(id));
  if (req.method === "GET") {
    res.status(200).json({ status: "success", data: todo });
  } else if (req.method === "PATCH") {
    todo.title = title;
    todo.des = des;
    user.save();
    res
      .status(200)
      .json({ status: "success", message: "Task updated successfully" });
  }
}
