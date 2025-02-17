import React, { useEffect, useState } from "react";
import CustomTable from "../../Common/CustomTable";
import CustomButton from "../../Common/CustomButton";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCustomMessage } from "../../Common/CustomMessage";
import { GET, POST } from "../../ApiFunction/ApiFunction";

const InstructorCourse = () => {
  const [coursedata, setCoursedata] = useState([]);
  const [modalData, setModalData] = useState([]);
  const showMessage = useCustomMessage();
  const navigate = useNavigate();
  console.log(modalData);
  const token = sessionStorage.getItem("token");

  const handleaddcourse = () => {
    navigate("/instructordashboard/instructorcourse/addCourse");
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await GET(
      `${process.env.REACT_APP_BACKEND_URL}/getinstcourse`
    );

    if (result) {
      setCoursedata(result);
    } else {
      setCoursedata([]);
    }
  };
  const deleteData = async (params) => {
    const { _id, courseName } = params;
    const url = `${process.env.REACT_APP_BACKEND_URL}/request`;
    try {
      const res = await POST(url, {
        courseid: _id,
        coursename: courseName,
      });
      if (res.status === 200) {
        showMessage("success", res.data.message);
      } else {
        showMessage("error", res.data.message);
      }
      getData();
    } catch (error) {
      showMessage("error", "Failed to delete course. Please try again.");
    }
  };
  const editData = (params) => {
    navigate("/instructordashboard/instructorcourse/editCourse", {
      state: params,
    });
  };

  return (
    <div className="grid gap-8 lg:gap-12">
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
      <CustomTable
        data={coursedata}
        rowClick={(e) => setModalData(e)}
        deleteFunction={(paeams) => deleteData(paeams)}
        editFunction={(paeams) => editData(paeams)}
      />
    </div>
  );
};

export default InstructorCourse;
