import React, { useState } from "react";
import Notify from "./Notify";
import { GiProgression } from "react-icons/gi";
import { BsCheckAll } from "react-icons/bs";
import { TbZzz } from "react-icons/tb";
import { FiTrash } from "react-icons/fi";
import { MdEditNote } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Link from "next/link";

const TodoElement = ({ todo, fetchTodos }) => {
  const [dots, setDots] = useState(false);
  const { title, des, status, _id } = todo;
  const updateTodo = async (id, situation) => {
    if (situation !== status) {
      const res = await fetch("/api/todos", {
        method: "PATCH",
        body: JSON.stringify({ id, situation }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status === "success") {
        Notify(data.status, `Task "${todo.title}" updated successfully`);
        fetchTodos();
      }
    }
  };
  return (
    <div onClick={() => setDots(false)} className="home-todo-element">
      <div className="space-y-2">
        {/* dots and title */}
        <div className="flex justify-between">
          <h1 className="font-bold w-[95%] text-p_blue text-xl xl:text-2xl">
            {title}
          </h1>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setDots(!dots);
            }}
            className="bg-gray-100 relative hover:bg-gray-200 cursor-pointer transition duration-100 ease-in-out w-8 h-8 flex items-center justify-center rounded-full"
          >
            <HiOutlineDotsHorizontal />
            {dots && (
              <div className="bg-white shadow-xl shadow-slate-200 rounded-2xl py-3 px-2 space-y-1 absolute -top-1 right-10">
                <Link
                  className="hover:bg-slate-50 transition duration-100 ease-in-out rounded-lg py-1 px-4 flex items-center font-medium text-gray-500"
                  href={`/edit/${_id}`}
                >
                  <MdEditNote className="mr-3 text-xl" /> Edit
                </Link>
                <div
                  onClick={() => updateTodo(_id, "")}
                  className="hover:bg-slate-50 transition duration-100 ease-in-out rounded-lg py-1 px-4 flex items-center font-medium text-gray-500"
                >
                  <FiTrash className="mr-3 text-xl" /> Delete
                </div>
              </div>
            )}
          </div>
        </div>
        {/* description */}
        {des ? (
          <p className="text-sm text-gray-400">
            {des.length > 100 ? `${des.substring(0, 100)}...` : des}
          </p>
        ) : (
          <p>...</p>
        )}
      </div>
      {/* icons */}
      <div className="flex items-center justify-center space-x-5 sm:space-x-10 md:space-x-8 xl:space-x-10">
        <div
          onClick={() => updateTodo(_id, "uncompleted")}
          className={`${
            status === "uncompleted" && "bg-p_blue text-white hover:bg-blue-600"
          } todo-status-btn text-xl`}
        >
          <TbZzz />
        </div>
        <div
          onClick={() => updateTodo(_id, "doing")}
          className={`${
            status === "doing" && "bg-orange-500 text-white hover:bg-orange-600"
          } todo-status-btn`}
        >
          <GiProgression />
        </div>
        <div
          onClick={() => updateTodo(_id, "done")}
          className={`${
            status === "done" && "bg-green-500 text-white hover:bg-green-600"
          } todo-status-btn text-xl`}
        >
          <BsCheckAll />
        </div>
      </div>
    </div>
  );
};

export default TodoElement;
