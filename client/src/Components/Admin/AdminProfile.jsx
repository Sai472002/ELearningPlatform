import React, { useEffect, useState } from "react";
import CustomButton from "../Common/CustomButton";
import CustomDonut from "../Common/CustomDonut";
import { GET } from "../ApiFunction/ApiFunction";
import CountUp from "react-countup";
import CourseProfile from "./CourseProfile";
import { Progress } from "antd";
import { action } from "../Url/url";

const AdminProfile = () => {
  const [userData, setUserData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [active, setActive] = useState(0);
  const [adminstats, setAdminstats] = useState({});
  const adminData = [
    {
      title: "Courses",
      count: courseData?.length,
    },
    {
      title: "Enrolled",
      count: adminstats.totalStudents,
    },
    {
      title: "Instructors",
      count: adminstats.totalInstructors,
    },
    {
      title: "Revenue",
      count: adminstats.totalRevenue,
    },
  ];
  const fetchData = async () => {
    const colorMap = new Map([
      ["Technology", "#22c55e"],
      ["Business", "#4338ca"],
      ["Design", "#6d28d9"],
      ["Programming", "#e11d48"],
      ["Personal Development", "#ca8a04"],
      ["Other", "#16a34a"],
    ]);
    const result = await GET(action.GET_ALL_COURSE);
    const course = result
      ?.map((v) => v.courseType)
      .reduce((acc, category, i) => {
        const existing = acc.find((item) => item.name === category);
        if (existing) {
          existing.count += 1;
        } else {
          acc.push({
            name: category,
            count: 1,
            color: colorMap.get(category) || "#000000",
          });
        }
        return acc;
      }, []);
    setCourseData(course);
    setUserData(result);
  };

  const fetchadmin = async () => {
    try {
      const stats = await GET(action.ADMIN_STATS);
      setAdminstats(stats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchadmin();
  }, []);
  return (
    <div className="text-gray-700 flex flex-col gap-4 h-full lg:overflow-hidden">
      <p>Admin Profile</p>
      <div className="grid md:grid-cols-4 md:h-[200px] p-2 grid-cols-2 items-center border gap-4 bg-slate-50 rounded-lg box-border">
        {adminData.map((v, i) => (
          <div
            key={i}
            className=" bg-gradient-to-r from- md:w-full md:h-[130px] rounded-lg text-xs text-center flex flex-col hover:bg-white hover:shadow ease-in-out transition-all"
          >
            <div className="p-2 text-left">
              <p className="text-base ml-3 mb-2 text-gray-500 hover:text-gray-500">
                <strong>{v.title}</strong>
              </p>
            </div>
            <strong className="text-base md:text-4xl text-Primary min-w-9 md:min-w-16 items-center flex justify-center">
              <CountUp start={0} end={v.count} duration={2} />
            </strong>
          </div>
        ))}
      </div>
      {active === 0 ? (
        <CourseProfile
          courseData={courseData}
          allCourse={userData}
          refresh={() => fetchData()}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminProfile;
