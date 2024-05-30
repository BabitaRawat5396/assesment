import React from "react";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div className="w-full grid grid-cols-4 h-screen  ">
      <div className="">
        <Sidebar />
      </div>
      <div className="col-span-3 h-full">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
