import Link from "next/link";
import React from "react";
import { BsCheckAll } from "react-icons/bs";
import { FiTrash } from "react-icons/fi";
import { GiProgression } from "react-icons/gi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdEditNote } from "react-icons/md";
import { TbZzz } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";

const TodoMoreOptions = ({ dots, setDots, _id, updateTodo, status }) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setDots(!dots);
      }}
      className="bg-gray-100 relative hover:bg-gray-200 cursor-pointer transition duration-100 ease-in-out w-8 h-8 flex items-center justify-center rounded-full"
    >
      {dots ? (
        <>
          <IoCloseOutline className="text-lg" />
          <div className="bg-white shadow-xl shadow-gray-300 border rounded-2xl py-3 px-2 space-y-2 absolute -top-1 right-10">
            <div className="shadow space-y-1 rounded-2xl p-1 px-2">
              <div
                onClick={() => updateTodo(_id, "done")}
                className={`${
                  status === "done"
                    ? "bg-p_green text-white hover:bg-green-600"
                    : "hover:bg-slate-50 text-gray-500"
                } transition duration-100 text-xs lg:text-sm ease-in-out rounded-lg py-1 px-4 flex items-center font-medium`}
              >
                <BsCheckAll className="mr-3 lg:text-lg" /> Done
              </div>
              <div
                onClick={() => updateTodo(_id, "uncompleted")}
                className={`${
                  status === "uncompleted"
                    ? "bg-p_blue text-white hover:bg-blue-600"
                    : "hover:bg-slate-50 text-gray-500"
                } transition duration-100 text-xs lg:text-sm ease-in-out rounded-lg py-1 px-4 flex items-center font-medium`}
              >
                <TbZzz className="mr-3 lg:text-lg" /> Uncompleted
              </div>
              <div
                onClick={() => updateTodo(_id, "doing")}
                className={`${
                  status === "doing"
                    ? "bg-p_orange text-white hover:bg-orange-600"
                    : "hover:bg-slate-50 text-gray-500"
                } transition duration-100 text-xs lg:text-sm ease-in-out rounded-lg py-1 px-4 flex items-center font-medium`}
              >
                <GiProgression className="mr-3 lg:text-lg" /> In Progress
              </div>
            </div>
            <div className="shadow space-y-1 rounded-2xl p-1 px-2">
              <Link
                className="hover:bg-slate-50 text-xs lg:text-sm transition duration-100 ease-in-out rounded-lg py-1 px-4 flex items-center font-medium text-gray-500"
                href={`/edit/${_id}`}
              >
                <MdEditNote className="mr-3 lg:text-lg" /> Edit
              </Link>
              <div
                onClick={() => updateTodo(_id, "")}
                className="hover:bg-slate-50 text-xs lg:text-sm transition duration-100 ease-in-out rounded-lg py-1 px-4 flex items-center font-medium text-gray-500"
              >
                <FiTrash className="mr-3 lg:text-lg" /> Delete
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <HiOutlineDotsHorizontal />
        </div>
      )}
    </div>
  );
};

export default TodoMoreOptions;
