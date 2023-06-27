import Link from "next/link";
import React, { useState } from "react";
import { VscPersonAdd } from "react-icons/vsc";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import Notify from "@/components/Notify";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [eyeOpen, setEyeOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  const registerHandler = async () => {
    if (user.name && user.lastName && user.email && user.password) {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setLoading(false);
      Notify(data.status, data.message);
      if (data.status === "success") router.push("/auth/login");
    } else {
      Notify("warning", "Please fill all fields");
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-3 mt-14">
      {/* icon section */}
      <div className="flex flex-col items-center space-y-3">
        <div className="bg-blue-500 rounded-full p-4 outline outline-blue-300 outline-offset-2 text-white text-4xl">
          <VscPersonAdd />
        </div>
        <div className="font-bold text-blue-400">
          <p>Create your account</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="p-5 space-y-5">
          <div>
            <input
              autoFocus
              className="w-[250px] md:w-[400px] outline-none border-b-2 border-blue-100 focus:border-blue-400 transition-all duration-300 focus:placeholder:text-blue-500 ease-in-out font-medium text-blue-500 placeholder:text-blue-300 placeholder:text-[14px] py-3 md:py-5 md:px-6 px-5"
              type="text"
              placeholder="Name"
              name="name"
              value={user.name}
              onChange={changeHandler}
            />
          </div>
          <div>
            <input
              className="w-[250px] md:w-[400px] outline-none border-b-2 border-blue-100 focus:border-blue-400 transition-all duration-300 focus:placeholder:text-blue-500 ease-in-out font-medium text-blue-500 placeholder:text-blue-300 placeholder:text-[14px] py-3 md:py-5 md:px-6 px-5"
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={user.lastName}
              onChange={changeHandler}
            />
          </div>
          <div>
            <input
              className="w-[250px] md:w-[400px] outline-none border-b-2 border-blue-100 focus:border-blue-400 transition-all duration-300 focus:placeholder:text-blue-500 ease-in-out font-medium text-blue-500 placeholder:text-blue-300 placeholder:text-[14px] py-3 md:py-5 md:px-6 px-5"
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={changeHandler}
            />
          </div>
          <div className="flex items-center w-[250px] md:w-[400px] border-b-2 border-blue-100">
            <input
              className="outline-none bg-transparent focus:border-blue-400 transition-all duration-300 focus:placeholder:text-blue-500 ease-in-out font-medium text-blue-500 placeholder:text-blue-300 placeholder:text-[14px] py-3 md:py-5 md:px-6 pl-5"
              type={eyeOpen ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={changeHandler}
            />
            <div
              onClick={() => setEyeOpen(!eyeOpen)}
              className="md:ml-[120px] ml-1 text-blue-600 cursor-pointer w-5 h-5 flex items-center justify-center"
            >
              {eyeOpen ? <RiEyeOffLine /> : <RiEyeLine />}
            </div>
          </div>
        </div>
        <button
          onClick={registerHandler}
          className="bg-blue-600 w-[250px] md:w-[400px] rounded-xl text-white font-black py-3 md:py-5 md:px-6"
        >
          {loading ? <Loader /> : "Sign up"}
        </button>
      </div>
      <div className="flex items-center justify-center mt-3 space-x-1">
        <p className="text-sm text-gray-500">Already have an account?</p>
        <Link href="/auth/login" className="font-bold text-blue-500">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Register;
