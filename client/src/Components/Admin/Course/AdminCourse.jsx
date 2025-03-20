import React, { useEffect, useMemo, useState } from "react";
import { useCustomMessage } from "../../Common/CustomMessage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomButton from "../../Common/CustomButton";
import { PlusOutlined } from "@ant-design/icons";
import CustomTable from "../../Common/CustomTable";
import { GET } from "../../ApiFunction/ApiFunction";
import { action } from "../../Url/url";
import CustomInput from "../../Common/CustomInput";

const AdminCourse = () => {
  const [coursedata, setCoursedata] = useState([]);
  const [active, setActive] = useState(0);
  const showMessage = useCustomMessage();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const buttonOption = [
    { name: "View All", color: "#334155" },
    { name: "Technology", color: "#0ea5e9" },
    { name: "Business", color: "#6366f1" },
    { name: "Design", color: "#8b5cf6" },
    { name: "Programming", color: "#f43f5e" },
    { name: "Personal Development", color: "#eab308" },
  ];

  const handleaddcourse = () => {
    navigate("/adminpanel/course/addCourse");
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await GET(action.GET_ALL_COURSE);
    setCoursedata(result);
  };

  const deleteData = async (params) => {
    const { _id } = params;
    const token = sessionStorage.getItem("token");
    try {
      await axios.delete(`${action.DEL_COURSE}/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getData();
    } catch (error) {
      showMessage("error", "Failed to delete course. Please try again.");
    }
  };

  const filterData = useMemo(() => {
    if (active !== 0) {
      return coursedata.filter(
        (a) => a.courseType == buttonOption[active].name
      );
    }

    if (search) {
      return coursedata.filter((a) =>
        a.courseName.toLowerCase().includes(search.toLowerCase())
      );
    }

    return coursedata;
  }, [active, coursedata, search]);

  const editData = (params) => {
    navigate("/adminpanel/course/editCourse", {
      state: params,
    });
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="lg:text-lg font-semibold text-gray-700 flex gap-2 ">
          All Courses
          <p className="rounded-full text-sm h-[30px] w-[30px] flex items-center justify-center bg-Primary text-white ">
            {coursedata.length}
          </p>
        </h1>
        {/* <CustomButton
          title="Create new"
          onClick={handleaddcourse}
          icon={<PlusOutlined />}
          variant="default"
          className="bg-Primary py-5 font-bold tracking-wider text-white capitalize hover:bg-Primary/80"
        /> */}
      </div>
      <div className="flex justify-end items-center flex-wrap gap-4">
        {buttonOption.map((v, i) => (
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
        <CustomInput
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Course Name"
          containerClassName="ml-auto"
        />
      </div>
      <CustomTable
        data={filterData}
        rowClick={(i) => navigate(`/adminpanel/coursedetails/${i}`)}
        deleteFunction={(paeams) => deleteData(paeams)}
        editFunction={(paeams) => editData(paeams)}
      />
    </div>
  );
};

export default AdminCourse;
