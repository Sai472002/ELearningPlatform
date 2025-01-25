import React, { useEffect, useMemo, useState } from "react";
import { useCustomMessage } from "../../Common/CustomMessage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomButton from "../../Common/CustomButton";
import { PlusOutlined } from "@ant-design/icons";
import CustomTable from "../../Common/CustomTable";

const AdminCourse = () => {
  const [coursedata, setCoursedata] = useState([]);
  const [active, setActive] = useState(5);
  const showMessage = useCustomMessage();
  const navigate = useNavigate();
  const filterOption = [
    { name: "Technology", color: "#0ea5e9" },
    { name: "Business", color: "#6366f1" },
    { name: "Design", color: "#8b5cf6" },
    { name: "Programming", color: "#f43f5e" },
    { name: "Personal Development", color: "#eab308" },
    { name: "View All", color: "#334155" },
  ];

  const token = sessionStorage.getItem("token");

  const handleaddcourse = () => {
    navigate("/adminpanel/course/addCourse");
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const token = sessionStorage.getItem("token");
    const result = await axios.get("http://localhost:3000/getallcourse", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (result.data) {
      setCoursedata(result.data);
    } else {
      setCoursedata([]);
    }
  };

  const deleteData = async (params) => {
    const { _id } = params;
    try {
      await axios.delete(`http://localhost:3000/deletecourse/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getData();
    } catch (error) {
      console.error("Error deleting course:", error);
      showMessage("error", "Failed to delete course. Please try again.");
    }
  };

  const filteredData = useMemo(() => {
    let filter
    if (active === 0) {
      return (filter = coursedata.filter((v) => v.courseType === "Technology"));
    } else if (active === 1) {
      return (filter = coursedata.filter((v) => v.courseType === "Business"));
    } else if (active === 2) {
      return (filter = coursedata.filter((v) => v.courseType === "Design"));
    } else if (active === 3) {
      return (filter = coursedata.filter(
        (v) => v.courseType === "Programming"
      ));
    } else if (active === 4) {
      return (filter = coursedata.filter(
        (v) => v.courseType === "Personal Development"
      ));
    } else {
      return coursedata;
    }
  }, [active, coursedata]);

  const editData = (params) => {
    navigate("/adminpanel/course/editCourse", {
      state: params,
    });
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="lg:text-lg font-semibold text-gray-700">All Courses</h1>
        <CustomButton
          title="Create new"
          onClick={handleaddcourse}
          icon={<PlusOutlined />}
          variant="default"
          className="bg-Primary py-5 font-bold tracking-wider text-white capitalize hover:bg-Primary/80"
        />
      </div>
      <div className="flex flex-row-reverse justify-end items-center flex-wrap gap-4">
        {filterOption.map((v, i) => (
          <button
            key={i}
            className={`p-2 rounded text-xs border duration-500 transition-all`}
            style={{
              borderColor: v.color,
              color: active === i ? "white" : v.color,
              backgroundColor: active === i && v.color,
            }}
            onClick={() => setActive(i)}
          >
            {v.name}
          </button>
        ))}
      </div>
      <CustomTable
        data={filteredData}
        deleteFunction={(paeams) => deleteData(paeams)}
        editFunction={(paeams) => editData(paeams)}
      />
    </div>
  );
};

export default AdminCourse;
