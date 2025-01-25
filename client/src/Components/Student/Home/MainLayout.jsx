import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { GET } from "../../ApiFunction/ApiFunction";
import { useCustomMessage } from "../../Common/CustomMessage";
import { SmileTwoTone } from "@ant-design/icons";
import Dashboard from "../../Instructor/Dashboard";
import axios from "axios";

function MainLayout() {
  const [data, setData] = useState([]);
  const showMessage = useCustomMessage();

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const result = await axios.get("http://localhost:3000/getData", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(result);
        showMessage("success", "Welcome", <SmileTwoTone />);
      }
    } catch (error) {
      showMessage("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
//  console.log(data);
 
  return (
    <>
      <Nav />
      {!data ? <LoadingPage /> : <Outlet />}
    </>
  );
}

export default MainLayout;
