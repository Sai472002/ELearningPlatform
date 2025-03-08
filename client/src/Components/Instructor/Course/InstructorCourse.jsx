import React, { useEffect, useMemo, useState } from "react";
import CustomTable from "../../Common/CustomTable";
import CustomButton from "../../Common/CustomButton";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCustomMessage } from "../../Common/CustomMessage";
import { GET, POST } from "../../ApiFunction/ApiFunction";
import { action } from "../../Url/url";
import CustomInput from "../../Common/CustomInput";

const InstructorCourse = () => {
  const [coursedata, setCoursedata] = useState([]);
  const showMessage = useCustomMessage();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [active, setActive] = useState(0);
  const [search , setSearch] = useState("")

  const buttonOption = [
    { name: "View All", color: "#334155" },
    { name: "Technology", color: "#0ea5e9" },
    { name: "Business", color: "#6366f1" },
    { name: "Design", color: "#8b5cf6" },
    { name: "Programming", color: "#f43f5e" },
    { name: "Personal Development", color: "#eab308" },
  ];

  const filterData = useMemo(() => {
    if(active!==0){
     return coursedata.filter(a=>a.courseType==buttonOption[active].name)
    }

    if(search){
      return coursedata.filter(a=>a.courseName.toLowerCase().includes(search.toLowerCase()))
    }

    return coursedata
  }, [active, coursedata,search]); 

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
    try {
      const res = await POST(action.POST_REQ, {
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
    <div className="grid gap-6 ">
      <div className="flex items-center justify-between">
        <h1 className="lg:text-lg font-semibold text-gray-700 flex gap-2 ">
          All Courses{" "}
          <p className="rounded-full text-sm h-[30px] w-[30px] flex items-center justify-center bg-Primary text-white ">
            {coursedata.length}
          </p>
        </h1>
        <CustomButton
          title="Create new"
          onClick={handleaddcourse}
          icon={<PlusOutlined />}
          variant="default"
          className="bg-Primary py-5 font-bold tracking-wider text-white capitalize hover:bg-Primary/80"
        />
      </div>
      <div className="flex justify-start md:justify-between items-center flex-wrap gap-4">
       <div className="flex flex-wrap gap-2">
        
       {buttonOption.map((a, i) => (
          <button
          key={i}
          className="p-2 rounded text-xs border duration-500 transition-all"
          style={{
            backgroundColor: active === i ? a.color : "white",
            color: active === i ? "white" : a.color,
            borderColor: a.color
          }}
          onClick={() => setActive(i)}
          >
            {a.name}
          </button>
        ))}
       </div>
        <CustomInput onChange={(e)=>setSearch(e.target.value)} placeholder="Search by Course Name"/>

      </div>
      <CustomTable
        data={filterData}
        rowClick={(i) => navigate(`/instructordashboard/coursedetails/${i}`)}
        deleteFunction={(params) => deleteData(params)}
        editFunction={(params) => editData(params)}
      />
    </div>
  );
};

export default InstructorCourse;
