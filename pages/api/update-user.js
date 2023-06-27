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
  //****/   checking token existance   /****//
  const session = await getSession({ req });
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
  if (req.method === "PATCH") {
    const { name, lastName, email } = req.body;
    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.save();
    res.status(200).json({
      status: "success",
      message: "Your information updated successfully",
    });
  }
}
