import Link from "next/link";
import { useState } from "react";
import { BsFillClipboardCheckFill } from "react-icons/bs";
import { CiCircleList } from "react-icons/ci";
import { BiAddToQueue, BiPlus } from "react-icons/bi";
import { GoPerson } from "react-icons/go";
import { TfiClose } from "react-icons/tfi";
import { RiMenu5Fill } from "react-icons/ri";
import { IoExitOutline } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const { status, data } = useSession();
  return (
    <header className="fixed top-0 right-0 left-0 z-10">
      <div className="backdrop-blur-lg shadow-lg shadow-slate-100 flex items-center justify-between relative p-3 xl:p-6">
        {/* logo section */}
        <Link
          href="/"
          className="flex items-center space-x-3 lg:text-2xl text-p_blue"
        >
          <BsFillClipboardCheckFill className="lg:text-4xl" />
          <span className="font-extrabold uppercase">Task Manager</span>
        </Link>
        {/* mobile menu section */}
        <div className="xl:hidden">
          {menu ? (
            <div className="flex flex-col justify-between absolute z-20 bg-white shadow-xl top-0 right-0 p-5 h-screen">
              <div className="space-y-5 text-p_blue">
                <div
                  onClick={() => setMenu(false)}
                  className="flex flex-row-reverse"
                >
                  <TfiClose className="cursor-pointer" />
                </div>
                {/* navbar ul list */}
                <ul className="space-y-5">
                  <li>
                    <Link
                      onClick={() => setMenu(false)}
                      className="space-x-2 flex items-center"
                      href="/"
                    >
                      <CiCircleList />
                      <span>Todos</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setMenu(false)}
                      className="space-x-2 flex items-center"
                      href="/add-todo"
                    >
                      <BiAddToQueue />
                      <span>Add Todo</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setMenu(false)}
                      className="space-x-2 flex items-center"
                      href="/dashboard"
                    >
                      <GoPerson />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                </ul>
              </div>
              {/* navbar user section */}
              {status === "authenticated" ? (
                <div className="flex flex-col items-center space-y-2 shadow rounded-lg p-3">
                  <h1 className="text-p_blue">
                    {data &&
                      (data.user.email.length > 10
                        ? `${data.user.email.substring(0, 10)}...`
                        : data.user.email)}
                  </h1>
                  <button
                    onClick={() => {
                      signOut();
                      setMenu(false);
                    }}
                    className="flex items-center justify-center space-x-1 rounded-full py-1 px-3 text-sm bg-white text-red-500 shadow"
                  >
                    <IoExitOutline />
                    <span className="font-bold">Log out</span>
                  </button>
                </div>
              ) : (
                <Link href="/auth/login">Log in</Link>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                href="/add-todo"
                className="border-2 border-p_blue rounded-full"
              >
                <BiPlus className="text-xl text-p_blue" />
              </Link>
              <div onClick={() => setMenu(true)}>
                <RiMenu5Fill className="text-xl text-p_blue cursor-pointer" />
              </div>
            </div>
          )}
        </div>
        {/* desktop menu section */}
        <div className="xl:flex hidden items-center space-x-10">
          <ul className="space-x-10 flex items-center text-p_blue">
            <li>
              <Link className="space-x-2 flex items-center" href="/">
                <CiCircleList />
                <span>Todos</span>
              </Link>
            </li>
            <li>
              <Link className="space-x-2 flex items-center" href="/add-todo">
                <BiAddToQueue />
                <span>Add Todo</span>
              </Link>
            </li>
            <li>
              <Link className="space-x-2 flex items-center" href="/dashboard">
                <GoPerson />
                <span>Dashboard</span>
              </Link>
            </li>
          </ul>
          {status === "authenticated" ? (
            <div className="flex items-center space-x-5 rounded-full shadow py-2 px-4">
              <button
                onClick={() => signOut()}
                className="flex items-center space-x-2 text-red-500"
              >
                <IoExitOutline />
                <span className="font-bold">Log out</span>
              </button>
              <p className="text-p_blue">|</p>
              <Link className="font-bold text-p_blue" href="/dashboard">
                {data &&
                  (data.user.email.length > 20
                    ? `${data.user.email.substring(0, 20)}...`
                    : data.user.email)}
              </Link>
            </div>
          ) : (
            <Link
              className="bg-white shadow rounded-full py-2 px-4 text-p_blue font-bold"
              href="/auth/register"
            >
              Sign up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
