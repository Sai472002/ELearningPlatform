import React, { useEffect, useState } from "react";
import InstructorTable from "../../Common/CustomTable";
import { useNavigate } from "react-router-dom";
import { useCustomMessage } from "../../Common/CustomMessage";
import axios from "axios";
import { GET } from "../../ApiFunction/ApiFunction";
import { action } from "../../Url/url";

const AdminStudent = () => {
  const [coursedata, setCoursedata] = useState([]);
  const [active, setActive] = useState(5);
  const showMessage = useCustomMessage();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await GET(action.GET_STUDENT);
    if (result.data) {
      setCoursedata(result.data);
    } else {
      setCoursedata([]);
    }
  };
  const columns = [
    {
      title: "Student Name",
      dataIndex: "name",
    },
    {
      title: "Email Id",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phonenumber",
    },
  ];

  const deleteData = async (params) => {
    const { userId } = params;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(action.DEL_STUDENT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { userId },
      });
      getData();
    } catch (error) {
      console.error("Error deleting course:", error);
      showMessage("error", "Failed to delete course. Please try again.");
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-2">
        <h1 className="lg:text-lg font-semibold text-gray-700">Student List</h1>
        <p className="flex items-center justify-center h-6 w-6 border border-Primary text-xs bg-Primary/10 text-Primary rounded-full">
          {coursedata.length}
        </p>
      </div>
      <div className="flex flex-row-reverse justify-end items-center flex-wrap gap-4"></div>
      <InstructorTable
        columns={columns}
        data={coursedata}
        deleteFunction={(record) => deleteData(record)}
        editBtn={false}
      />
    </div>
  );
};

export default AdminStudent;
