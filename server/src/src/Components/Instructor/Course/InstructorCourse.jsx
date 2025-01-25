import React, { useEffect, useState } from "react";
import CustomTable from "../../Common/CustomTable";
import CustomButton from "../../Common/CustomButton";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCustomMessage } from "../../Common/CustomMessage";

const InstructorCourse = () => {
  const [coursedata, setCoursedata] = useState([]);
  const showMessage = useCustomMessage();
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  const handleaddcourse = () => {
    navigate("/instructordashboard/instructorcourse/addCourse");
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const token = sessionStorage.getItem("token");
    const result = await axios.get("http://localhost:3000/getinstcourse", {
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
        deleteFunction={(paeams) => deleteData(paeams)}
        editFunction={(paeams) => editData(paeams)}
      />
    </div>
  );
};

export default InstructorCourse;
