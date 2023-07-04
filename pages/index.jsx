import Link from "next/link";
import TodoElement from "@/components/TodoElement";
import HomeLoader from "@/components/HomeLoader";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { BsUiChecksGrid } from "react-icons/bs";
import { BiAddToQueue } from "react-icons/bi";
import { HiArrowLongRight } from "react-icons/hi2";
import FilterTodo from "@/components/FilterTodo";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [filterTodos, setFilterTodos] = useState([]);
  const [data, setData] = useState(null);

  const fetchTodos = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();
    if (data.status === "success") {
      setTodos(data.data.todos);
      setData(data.data);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (todos.length) {
    return (
      <div className="min-h-screen my-16 lg:mt-28 px-3 lg:px-6 space-y-5">
        <div>
          <FilterTodo todos={todos} setFilterTodos={setFilterTodos} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filterTodos.length > 0
            ? filterTodos.map((todo, index) => (
                <TodoElement key={index} todo={todo} fetchTodos={fetchTodos} />
              ))
            : todos.map((todo, index) => (
                <TodoElement key={index} todo={todo} fetchTodos={fetchTodos} />
              ))}
        </div>
        <div className="flex items-center justify-center">
          <Link
            href="/add-todo"
            className="capitalize bg-p_blue text-white font-bold rounded-full flex items-center justify-center py-3 px-6 w-fit"
          >
            <BiAddToQueue className="mr-4 lg:text-2xl" />
            add more
          </Link>
        </div>
      </div>
    );
  } else if (todos.length === 0 && !data) {
    return (
      <div className="min-h-screen space-y-10 mt-24 lg:mt-44 px-3 lg:px-6 flex items-center flex-col">
        <HomeLoader />
      </div>
    );
  } else if (data && todos.length === 0) {
    return (
      <div className="min-h-screen space-y-10 mt-24 lg:mt-44 px-3 lg:px-6 flex items-center flex-col">
        <div className="flex items-center justify-center flex-col space-y-5">
          <div className="bg-blue-100 w-28 h-28 xl:w-52 xl:h-52 text-3xl xl:text-7xl flex items-center justify-center rounded-full text-blue-600 outline outline-offset-4 outline-blue-400">
            <BsUiChecksGrid />
          </div>
          <h1 className="capitalize font-bold text-center xl:text-3xl">
            no todos exist. add todos to manage them easily
          </h1>
        </div>
        <Link
          className="uppercase font-black bg-p_blue rounded-full py-3 px-8 text-white"
          href="/add-todo"
        >
          add todos
        </Link>
      </div>
    );
  }
};

export default Home;

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
