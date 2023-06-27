import React, { useState } from "react";
import Loader from "./Loader";
import Notify from "./Notify";
import { signOut } from "next-auth/react";

const EditProfile = ({
  changeHandler,
  editValue,
  fetchUser,
  setEditValue,
  name,
  lastName,
  email,
  setEdit,
}) => {
  const [loading, setLoading] = useState(false);
  const editHandler = async () => {
    if (editValue.name || editValue.lastName || editValue.email) {
      setLoading(true);
      const res = await fetch("/api/update-user", {
        method: "PATCH",
        body: JSON.stringify({
          name: editValue.name ? editValue.name : name,
          lastName: editValue.lastName ? editValue.lastName : lastName,
          email: editValue.email ? editValue.email : email,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status === "success") {
        setLoading(false);
        if (editValue.email) {
          signOut();
        }
        setEditValue({
          name: "",
          lastName: "",
          email: "",
        });
        setEdit(false);
        Notify(data.status, data.message);
        fetchUser();
      }
    } else {
      Notify("warning", "Please fill at least one of the fileds to procced");
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div className="p-5 space-y-5">
        <div>
          <input
            autoFocus
            className="w-[250px] md:w-[400px] outline-none border-b-2 border-blue-100 focus:border-blue-400 transition-all duration-300 focus:placeholder:text-blue-500 ease-in-out font-medium text-blue-500 placeholder:text-blue-300 placeholder:text-[14px] py-3 md:py-5 md:px-6 px-5"
            name="name"
            type="text"
            placeholder="Name..."
            value={editValue.name}
            onChange={changeHandler}
          />
        </div>
        <div>
          <input
            className="w-[250px] md:w-[400px] outline-none border-b-2 border-blue-100 focus:border-blue-400 transition-all duration-300 focus:placeholder:text-blue-500 ease-in-out font-medium text-blue-500 placeholder:text-blue-300 placeholder:text-[14px] py-3 md:py-5 md:px-6 px-5"
            type="text"
            name="lastName"
            placeholder="Last Name..."
            value={editValue.lastName}
            onChange={changeHandler}
          />
        </div>
        <div>
          <input
            className="w-[250px] md:w-[400px] outline-none border-b-2 border-blue-100 focus:border-blue-400 transition-all duration-300 focus:placeholder:text-blue-500 ease-in-out font-medium text-blue-500 placeholder:text-blue-300 placeholder:text-[14px] py-3 md:py-5 md:px-6 px-5"
            type="email"
            name="email"
            placeholder="Email..."
            value={editValue.email}
            onChange={changeHandler}
          />
        </div>
      </div>
      <button
        onClick={editHandler}
        className="bg-blue-600 w-[250px] md:w-[400px] rounded-xl text-white font-black py-3 md:py-5 md:px-6"
      >
        {loading ? <Loader /> : "Confirm"}
      </button>
    </div>
  );
};

export default EditProfile;
