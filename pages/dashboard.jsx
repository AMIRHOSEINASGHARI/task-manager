import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import EditProfile from "@/components/EditProfile";
import DashboardUserInformations from "@/components/DashboardUserInformations";
import DashboardUserTodos from "@/components/DashboardUserTodos";

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
        <div className="flex items-center justify-center flex-col">
          <DashboardUserInformations user={user} />
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
      <DashboardUserTodos
        user={user}
        unCompleted={unCompleted}
        doing={doing}
        done={done}
      />
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
