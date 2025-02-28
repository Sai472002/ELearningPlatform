import {
  ContactsOutlined,
  ContainerOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MenuOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { GET } from "../ApiFunction/ApiFunction";
import { Modal } from "antd";
import { action } from "../Url/url";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { confirm } = Modal;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuId, setMenuId] = useState(0);
  const [userData, setUserData] = useState("- - -");

  const fetchData = async () => {
    const result = await GET(action.GET_INS);
    setUserData(result[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navList = [
    {
      id: 1,
      to: "/instructordashboard",
      title: "Instructor Profile",
      icon: <UserOutlined className="mr-2 text-Primary" />,
    },
    {
      id: 2,
      to: "/instructordashboard/instructorcourse",
      title: "Courses",
      icon: <ContainerOutlined className="mr-2 text-Primary" />,
    },
    {
      id: 3,
      to: "/instructordashboard/instructorrequest",
      title: "My Request",
      icon: <SendOutlined className="mr-2 text-Primary" />,
    },
  ];

  // Animation variants for the sidebar
  const menuVariants = {
    open: {
      opacity: 1,
      width: "", // Adjusted for mobile sidebar width
      backgroundColor: "white",
      transition: {
        duration: 0.2,
        type: "linear",
      },
    },
    closed: {
      opacity: 1,
      width: 0,
      backgroundColor: "white",
      transition: {
        duration: 0.2,
        type: "easeInOut",
      },
    },
  };

  const handleMenuClick = (each) => {
    setMenuId(each.id);
    setIsMenuOpen((prev) => !prev);
  };
  const showConfirm = () => {
    confirm({
      title: "Are you sure you want to logout ?",
      icon: null,
      content: null,
      onOk() {
        handleSignOut();
      },
      okButtonProps: {
        className: "bg-red-500",
      },
      okText: "Logout",
    });
  };
  const handleSignOut = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <div
      className={`flex flex-col lg:flex-row h-screen w-screen ${
        isMenuOpen && "overflow-hidden"
      }`}
    >
      <div className=" lg:flex items-start lg:bg-Primary ">
        <h1 className="font-bold tracking-widest lg-text-lg p-4 bg-Primary flex text-white lg:w-fit items-center w-full">
          <MenuOutlined
            className={`mr-2 bg-gray-100/10 hover:bg-white ${
              isMenuOpen && "bg-white !text-black"
            } hover:text-black transition-all duration-300 text-white rounded-full p-2`}
            onClick={handleMenuClick}
          />
          <span className={` lg:hidden`}>Dashboard</span>
          <LogoutOutlined
            className="text-white ml-auto lg:hidden bg-red-500 p-2 rounded-full"
            onClick={showConfirm}
          />
        </h1>
        <motion.div
          className={
            "fixed lg:sticky z-50 top-18 left-0 h-full shadow-lg w-full md:w-fit"
          }
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          variants={menuVariants}
          style={{ overflow: "hidden" }}
        >
          <h1 className="hidden lg:flex gap-2 justify-center p-4 tracking-widest text-lg font-bold bg-gray-50">
            Dashboard
          </h1>
          <ul className="capitalize flex flex-col m-4">
            {navList.map((each, i) => (
              <Link to={each.to} key={each.id} onClick={handleMenuClick}>
                <li
                  key={each.id}
                  className={`p-2 text-nowrap rounded-md m-2 border ${
                    menuId === each.id
                      ? "!text-Primary !bg-Primary/5"
                      : "bg-gray-100/10"
                  } hover:border-Primary hover:text-Primary transition-all duration-300`}
                >
                  {each.icon}
                  {each.title}
                </li>
              </Link>
            ))}
          </ul>
        </motion.div>
      </div>
      <div className="w-full shadow-lg h-full grid grid-rows-[7%_93%] bg-Primary/5 overflow-hidden">
        <div className="bg-white border-b-2 flex items-center justify-end gap-2 p-4 sticky top-0 ">
          <h1 className="mr-auto capitalize text-xs tracking-widest rounded-lg p-1">
            Good to see you again &#128516;
          </h1>
          <LogoutOutlined
            className="text-white hidden lg:block bg-red-500 p-1 rounded-full"
            onClick={showConfirm}
          />
        </div>
        <motion.div
          className={`bg-white md:m-3 mr-0 shadow-lg rounded-lg md:p-4 p-2 ${
            location.pathname.split("/").slice(0, 3).join("/") ===
            "/instructordashboard/coursedetails"
              ? "overflow-hidden"
              : "overflow-y-auto"
          }`}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
