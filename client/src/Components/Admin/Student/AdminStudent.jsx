import React, { useEffect, useMemo, useState } from "react";
import InstructorTable from "../../Common/CustomTable";
import { useNavigate } from "react-router-dom";
import { useCustomMessage } from "../../Common/CustomMessage";
import axios from "axios";
import { GET } from "../../ApiFunction/ApiFunction";
import { action } from "../../Url/url";
import CustomInput from "../../Common/CustomInput";

const AdminStudent = () => {
  const [coursedata, setCoursedata] = useState([]);
  const [active, setActive] = useState(5);
  const [search, setSearch] = useState("");
  const showMessage = useCustomMessage();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const filterData = useMemo(() => {
    if (search) {
      return coursedata.filter((a) =>
        a.username.toLowerCase().includes(search.toLowerCase())
      );
    }

    return coursedata;
  }, [active, coursedata, search]);

  const getData = async () => {
    const result = await GET(action.GET_STUDENT);
    setCoursedata(result);
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
      <h1 className="lg:text-lg font-semibold text-gray-700 flex gap-2 ">
        Student{" "}
        <p className="rounded-full text-sm h-[30px] w-[30px] flex items-center justify-center bg-Primary text-white ">
          {coursedata?.length}
        </p>
      </h1>
      <div className="flex items-center flex-wrap gap-4">
        <CustomInput
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Course Name"
        />
      </div>
      <InstructorTable
        columns={columns}
        data={filterData}
        deleteFunction={(record) => deleteData(record)}
        editBtn={false}
      />
    </div>
  );
};

export default AdminStudent;
