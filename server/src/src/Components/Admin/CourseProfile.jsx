import React from "react";
import CustomDonut from "../Common/CustomDonut";
import { Link } from "react-router-dom";

const CourseProfile = ({ courseData, allCourse, refresh = () => {} }) => {
  return (
    <div className="flex flex-col md:flex-row h-full relative items-center gap-10">
      <p className="absolute top-2 left-2">Trending</p>
      <CustomDonut
        courseData={courseData}
        className="h-fit sm:mx-auto w-fit p-4"
      />
      <div className="h-full w-full">
        <h1 className="p-2 bg-gray-50 text-gray-700">Details</h1>
        <div className="flex flex-wrap lg:flex-nowrap gap-4 h-full py-2">
          <div className="shadow p-4 rounded-md h-fit w-full lg:w-fit flex flex-col flex-wrap gap-4">
            {courseData?.map((v, i) => (
              <div className="flex items-center gap-4 text-xs">
                <span
                  className={`h-3 min-w-7`}
                  style={{ backgroundColor: v.color }}
                />
                <span className="flex-1">{v.name}</span>
              </div>
            ))}
          </div>
          <div className=" w-full grid gap-3 max-h-80 overflow-y-auto p-2 pt-0 relative">
            <div className="top-0 sticky bg-white p-2">
              <Link
                to="/adminpanel/course"
                className="text-Primary underline-offset-4 underline"
              >
                view all courses
              </Link>
            </div>
            {allCourse?.map((v) => (
              <ul className="text-xs bg-Primary/5 p-2">
                <li className="px-2">{v.courseName}</li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProfile;
