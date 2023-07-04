import React, { useState } from "react";

const DashboardUserInformations = ({ user }) => {
  return (
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
        <div
          className={`flex items-center space-x-3 shadow rounded-xl py-2 px-4 ${
            user?.email?.length > 20
              ? "w-screen sm:w-fit overflow-x-auto"
              : "w-fit"
          }`}
        >
          <span className="text-sm text-p_blue">Email:</span>
          <p className="rounded-full bg-slate-50 font-black text-gray-500 py-2 px-4">
            {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardUserInformations;
