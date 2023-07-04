import Link from "next/link";
import React from "react";
import { BiAddToQueue } from "react-icons/bi";
import { GoTasklist } from "react-icons/go";
import { HiArrowNarrowDown } from "react-icons/hi";

const DashboardUserTodos = ({ user, unCompleted, doing, done }) => {
  return (
    <>
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
    </>
  );
};

export default DashboardUserTodos;
