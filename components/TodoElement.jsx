import React, { useState } from "react";
import Notify from "./Notify";
import { BsCheckAll } from "react-icons/bs";
import TodoMoreOptions from "./TodoMoreOptions";

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
    <div
      onClick={() => setDots(false)}
      className={`home-todo-element border-b-4 ${
        status === "done"
          ? "border-p_green"
          : status === "doing"
          ? "border-p_orange"
          : "border-p_blue"
      }`}
    >
      {/* dots and title */}
      <div className="flex justify-between items-start">
        <h1
          className={`font-bold w-[95%] text-lg pr-2 ${
            status === "done"
              ? "text-p_green line-through"
              : status === "uncompleted"
              ? "text-p_blue"
              : status === "doing"
              ? "text-p_orange"
              : ""
          }`}
        >
          {title}
        </h1>
        {/* dots */}
        <div className="flex items-center space-x-2">
          <TodoMoreOptions
            dots={dots}
            setDots={setDots}
            _id={_id}
            updateTodo={updateTodo}
            status={status}
          />
          <div
            onClick={() => updateTodo(_id, "done")}
            className={`${
              status === "done"
                ? "bg-green-100 text-p_green hover:bg-green-200"
                : "bg-gray-100 hover:bg-gray-200"
            } cursor-pointer transition duration-100 ease-in-out w-8 h-8 flex items-center justify-center rounded-full`}
          >
            <BsCheckAll className="lg:text-lg" />
          </div>
        </div>
      </div>
      {/* description */}
      {des ? (
        <p
          className={`text-sm text-gray-400 ${
            status === "done" && "line-through "
          }`}
        >
          {des.length > 100 ? `${des.substring(0, 100)}...` : des}
        </p>
      ) : (
        <p>...</p>
      )}
    </div>
  );
};

export default TodoElement;
