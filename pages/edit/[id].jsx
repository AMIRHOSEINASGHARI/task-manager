import Loader from "@/components/Loader";
import Notify from "@/components/Notify";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Edit = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  useEffect(() => {
    fetchTodo();
  }, []);
  const fetchTodo = async () => {
    const res = await fetch(`/api/todo/${id}`);
    const data = await res.json();
    if (data.status === "success") {
      setTitle(data.data.title);
      setDes(data.data.des);
    }
  };
  const editHandler = async () => {
    setLoading(true);
    const res = await fetch(`/api/todo/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title, des }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setLoading(false);
    if (data.status === "success") {
      router.push("/");
      Notify(data.status, data.message);
    } else {
      Notify(data.status, data.message);
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="md:w-[700px] w-[270px] sm:w-[400px] border-b-2 border-s_blue focus:border-blue-400 transition-all duration-300 focus:placeholder:text-p_blue ease-in-out p-4 outline-none font-medium text-p_blue placeholder:text-blue-300 placeholder:text-[14px]"
          />
        </div>
        <div>
          <textarea
            rows={7}
            placeholder="Description"
            type="text"
            value={des}
            onChange={(e) => setDes(e.target.value)}
            className="md:w-[700px] w-[270px] sm:w-[400px] border-b-2 border-s_blue focus:border-blue-400 transition-all duration-300 focus:placeholder:text-p_blue ease-in-out p-4 outline-none font-medium text-p_blue placeholder:text-blue-300 placeholder:text-[14px]"
          />
        </div>
      </div>
      <div className="flex items-center justify-center ">
        <button
          onClick={editHandler}
          className="bg-p_blue font-bold flex items-center justify-center  py-2.5 px-6 hover:bg-blue-600 hover:outline hover:outline-offset-2 hover:outline-blue-400 text-white rounded-full transition-all duration-150 ease-out"
        >
          {loading ? <Loader /> : "Save"}
        </button>
      </div>
    </div>
  );
};

export default Edit;

export async function getServerSideProps(context) {
  const id = context.query.id;
  return {
    props: { id },
  };
}
