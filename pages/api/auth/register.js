import User from "@/models/user";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  if (req.method !== "POST") return;
  //****/   connecting to data base function   /****//
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Cannot connect to data base" });
  }
  //****/   variabales   /****//
  const { name, lastName, email, password } = req.body;
  const user = await User.findOne({ email: email });
  //****/   checking user existance   /****//
  if (user) {
    return res.status(422).json({
      status: "failed",
      message:
        "Such email is exist | Log in or Sign up with another Email address!",
    });
  }
  //****/   hashing password   /****//
  const hashedPassword = await hashPassword(password);
  //****/   creating user   /****//
  const newUser = await User.create({
    name,
    lastName,
    email,
    password: hashedPassword,
  });
  //****/   sending success response   /****//
  res.status(201).json({
    status: "success",
    message: "Congratulations! Your account successfully created",
  });
}
