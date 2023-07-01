import { getSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { GoTasklist } from "react-icons/go";
import { HiArrowNarrowDown } from "react-icons/hi";
import { BiAddToQueue } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import EditProfile from "@/components/EditProfile";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState({
    name: "",
    lastName: "",
    email: "",
  });
  const changeHandler = (e) => {
    setEditValue({
      ...editValue,
      [e.target.name]: e.target.value,
    });
  };
  const fetchUser = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();
    if (data.status === "success") setUser(data.data);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const unCompleted =
    user?.todos?.filter((todo) => todo.status === "uncompleted") || [];
  const doing = user?.todos?.filter((todo) => todo.status === "doing") || [];
  const done = user?.todos?.filter((todo) => todo.status === "done") || [];
  return (
    <div className="min-h-screen my-16 lg:mt-28 px-3 lg:px-6">
      {user && (
        <div className="flex flex-col items-center">
          <div className="space-y-4 flex flex-col items-center lg:space-y-0 lg:flex-row lg:items-center lg:justify-center lg:space-x-5">
            <div className="flex items-center space-x-3 shadow rounded-xl py-2 px-4 w-fit">
              <span className="text-sm text-p_blue">Name:</span>
              <p className="uppercase rounded-full bg-slate-50 font-black text-gray-500 py-2 px-4">
                {user?.name}
              </p>
            </div>
            <div className="flex items-center space-x-3 shadow rounded-xl py-2 px-4 w-fit">
              <span className="text-sm text-p_blue">Last Name:</span>
              <p className="uppercase rounded-full bg-slate-50 font-black text-gray-500 py-2 px-4">
                {user?.lastName}
              </p>
            </div>
            <div className="flex items-center space-x-3 shadow rounded-xl py-2 px-4 w-fit">
              <span className="text-sm text-p_blue">Email:</span>
              <p className="rounded-full bg-slate-50 font-black text-gray-500 py-2 px-4">
                {user?.email}
              </p>
            </div>
          </div>
          {!edit ? (
            <button
              onClick={() => setEdit(true)}
              className="bg-gray-100 hover:bg-gray-200 transition duration-150 ease-in-out cursor-pointer space-x-3 my-5 flex items-center justify-center rounded-full py-2 px-5 text-gray-600 w-fit"
            >
              <FaUserEdit />
              <span className="font-bold">Edit Profile</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setEditValue({
                    name: "",
                    lastName: "",
                    email: "",
                  });
                  setEdit(false);
                }}
                className="flex items-center bg-red-100 rounded-full p-3 mt-6 text-red-600"
              >
                <IoCloseOutline className="text-xl" />
              </button>
              <div className="flex items-center justify-center flex-col mt-5 text-center text-xs w-2/3 text-gray-400 capitalize">
                <p className=" mb-5">
                  In order to edit your profile information, please fill at
                  least one of the fileds below
                </p>
                <span className="text-red-600 text-lg font-black uppercase">
                  Attention!
                </span>
                <p>
                  if you want to edit your email address, after procced, you wll
                  be redirect to login page
                </p>
              </div>
              <EditProfile
                changeHandler={changeHandler}
                editValue={editValue}
                setEditValue={setEditValue}
                name={user.name}
                lastName={user.lastName}
                email={user.email}
                fetchUser={fetchUser}
                setEdit={setEdit}
              />
            </>
          )}
        </div>
      )}
      <hr className="my-10 md:mb-20" />
      {user && user?.todos?.length ? (
        <div className="space-y-10 md:space-y-20">
          <div className="space-y-10">
            <h1 className="text-center uppercase text-2xl md:text-6xl font-black text-gray-600">
              Your tasks status
            </h1>
            <div className="space-y-16">
              <div className="flex flex-col md:flex-row justify-center items-center space-y-5 md:space-y-0 md:space-x-5">
                <div className="text-gray-500 flex items-center justify-center border border-slate-100 space-x-5 shadow-lg shadow-slate-200 rounded-xl py-4 px-10">
                  <span>All</span>
                  <p className="text-2xl md:text-5xl font-bold">
                    {user?.todos?.length}
                  </p>
                </div>
                <div className="text-p_blue flex items-center justify-center border border-slate-100 space-x-5 shadow-lg shadow-slate-200 rounded-xl py-4 px-10">
                  <span>Uncompleted</span>
                  <p className="text-2xl md:text-5xl font-bold">
                    {unCompleted.length}
                  </p>
                </div>
                <div className="text-orange-500 flex items-center justify-center border border-slate-100 space-x-5 shadow-lg shadow-slate-200 rounded-xl py-4 px-10">
                  <span>Doing</span>
                  <p className="text-2xl md:text-5xl font-bold">
                    {doing.length}
                  </p>
                </div>
                <div className="text-green-500 flex items-center justify-center border border-slate-100 space-x-5 shadow-lg shadow-slate-200 rounded-xl py-4 px-10">
                  <span>Done</span>
                  <p className="text-2xl md:text-5xl font-bold">
                    {done.length}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-xl text-gray-500">
                  <HiArrowNarrowDown />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-5">
            <h1 className="text-center">
              Go to home page to manage your tasks
            </h1>
            <Link
              className="rounded-xl text-gray-600 hover:bg-slate-50 transition duration-100 ease-in-out flex items-center py-3 px-10 shadow-md shadow-slate-200"
              href="/"
            >
              <GoTasklist className="mr-5 text-xl" />
              Manage Tasks
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-5">
          <h1 className="text-center uppercase text-2xl md:text-6xl font-black text-gray-600">
            No Task
          </h1>
          <h1 className="text-center">To create task, click on this button</h1>
          <Link
            className="rounded-xl text-gray-600 hover:bg-slate-50 transition duration-100 ease-in-out flex items-center py-3 px-10 shadow-md shadow-slate-200"
            href="/add-todo"
          >
            <BiAddToQueue className="mr-5 text-xl" />
            Create Tasks
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: { destination: "/auth/login" },
    };
  }
  return {
    props: {},
  };
}
