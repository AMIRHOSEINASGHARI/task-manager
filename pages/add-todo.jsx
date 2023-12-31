import Notify from "@/components/Notify";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";

const AddTodo = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [todo, setTodo] = useState({
    title: "",
    des: "",
    status: "uncompleted",
  });
  const changeHandler = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };
  const addHandler = async () => {
    if (todo.title) {
      setLoading(true);
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status === "success") {
        router.push("/");
        setLoading(false);
        Notify(data.status, data.message);
      } else {
        Notify(data.status, data.message);
      }
    } else {
      Notify("warning", "Please fill title field");
    }
  };
  return (
    <div className="min-h-screen px-6 mt-24 md:mt-32 space-y-8">
      <div className="space-y-10 flex flex-col items-center justify-center">
        <div>
          <input
            autoFocus
            type="text"
            placeholder="Title"
            value={todo.title}
            name="title"
            onChange={changeHandler}
            className="md:w-[700px] w-[270px] sm:w-[400px] border-b-2 border-s_blue focus:border-blue-400 transition-all duration-300 focus:placeholder:text-p_blue ease-in-out p-4 outline-none font-medium text-p_blue placeholder:text-blue-300 placeholder:text-[14px]"
          />
        </div>
        <div>
          <textarea
            rows={7}
            placeholder="Description"
            type="text"
            value={todo.des}
            name="des"
            onChange={changeHandler}
            className="md:w-[700px] w-[270px] sm:w-[400px] border-b-2 border-s_blue focus:border-blue-400 transition-all duration-300 focus:placeholder:text-p_blue ease-in-out p-4 outline-none font-medium text-p_blue placeholder:text-blue-300 placeholder:text-[14px]"
          />
        </div>
      </div>
      <div className="flex items-center justify-center ">
        <button
          onClick={addHandler}
          className="bg-p_blue flex items-center justify-center md:w-20 md:h-20 w-14 h-14 hover:bg-blue-600 hover:outline hover:outline-offset-2 hover:outline-blue-400 text-white rounded-full transition-all duration-150 ease-out"
        >
          <BiAddToQueue className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default AddTodo;

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
