import Link from "next/link";
import React, { useState } from "react";
import { IoLogInOutline } from "react-icons/io5";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import Notify from "@/components/Notify";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const [eyeOpen, setEyeOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = async () => {
    if ((email, password)) {
      setLoading(true);
      const data = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      setLoading(false);
      if (!data.error) {
        router.push("/dashboard");
      } else {
        Notify("failed", data.error);
      }
    } else {
      alert("please fill all fields");
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-3 mt-14">
      {/* icon section */}
      <div className="flex flex-col items-center space-y-3">
        <div className="bg-p_blue rounded-full p-4 outline outline-blue-300 outline-offset-2 text-white text-4xl">
          <IoLogInOutline />
        </div>
        <div className="font-bold text-blue-400">
          <p>Log in to your account</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="p-5 space-y-5">
          <div>
            <input
              autoFocus
              className="w-[250px] md:w-[400px] outline-none border-b-2 border-s_blue focus:border-blue-400 transition-all duration-300 focus:placeholder:text-p_blue ease-in-out font-medium text-p_blue placeholder:text-blue-300 placeholder:text-[14px] py-3 md:py-5 md:px-6 px-5"
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center w-[250px] md:w-[400px] border-b-2 border-s_blue">
            <input
              className="outline-none bg-transparent focus:border-blue-400 transition-all duration-300 focus:placeholder:text-p_blue ease-in-out font-medium text-p_blue placeholder:text-blue-300 placeholder:text-[14px] py-3 md:py-5 md:px-6 pl-5"
              type={eyeOpen ? "text" : "password"}
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          onClick={loginHandler}
          className="bg-blue-600 w-[250px] md:w-[400px] rounded-xl text-white font-black py-3 md:py-5 md:px-6"
        >
          {loading ? <Loader /> : "Log in"}
        </button>
      </div>
      <div className="flex items-center justify-center mt-3 space-x-1">
        <p className="text-sm text-gray-500">Don't have an account?</p>
        <Link href="/auth/register" className="font-bold text-p_blue">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }
  return {
    props: {},
  };
}
