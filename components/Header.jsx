import Link from "next/link";
import { useState } from "react";
import { BsFillClipboardCheckFill } from "react-icons/bs";
import { CiCircleList } from "react-icons/ci";
import { BiAddToQueue } from "react-icons/bi";
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
      <div className="backdrop-blur-2xl shadow-lg shadow-slate-100 text-blue-500 flex items-center justify-between relative p-3 xl:p-6">
        {/* logo section */}
        <Link href="/" className="flex items-center space-x-3 lg:text-2xl">
          <BsFillClipboardCheckFill className="lg:text-4xl" />
          <span className="font-extrabold uppercase">Task Manager</span>
        </Link>
        {/* mobile menu section */}
        <div className="xl:hidden">
          {menu ? (
            <div className="flex flex-col justify-between absolute z-20 bg-white shadow-xl top-0 right-0 p-5 h-screen">
              <div className="space-y-5">
                <div
                  onClick={() => setMenu(false)}
                  className="flex flex-row-reverse"
                >
                  <TfiClose className="text-blue-500 cursor-pointer" />
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
                <div className="flex flex-col items-center space-y-2">
                  <h1>
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
                    className="flex items-center justify-center space-x-1 rounded-full py-1 px-3 text-sm bg-white text-blue-500 shadow-md"
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
            <div onClick={() => setMenu(true)}>
              <RiMenu5Fill className="text-xl cursor-pointer" />
            </div>
          )}
        </div>
        {/* desktop menu section */}
        <div className="xl:flex hidden items-center space-x-10">
          <ul className="space-x-10 flex items-center">
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
              <p>|</p>
              <Link className="font-bold" href="/dashboard">
                {data &&
                  (data.user.email.length > 20
                    ? `${data.user.email.substring(0, 20)}...`
                    : data.user.email)}
              </Link>
            </div>
          ) : (
            <Link
              className="bg-white rounded-full py-2 px-5 text-blue-500 font-bold"
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
