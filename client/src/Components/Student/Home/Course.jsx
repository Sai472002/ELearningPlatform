import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import js from "../../../Assets/CourseCatalog/Js.jpg";
import Reactfundamental from "../../../Assets/CourseCatalog/React.jpg";
import nodejs from "../../../Assets/CourseCatalog/Node.jpg";
import css from "../../../Assets/CourseCatalog/css.jpg";
import { GETCOURSE } from "../../ApiFunction/ApiFunction";
import { action } from "../../Url/url";
import { useCustomMessage } from "../../Common/CustomMessage";

const Course = () => {
  const [data, setData] = useState([]);
  const showMessage = useCustomMessage();
  const navigate = useNavigate();
  const fetch = async () => {
    const result = await GETCOURSE(action.GET_POPULAR_COURSE);
    setData(result);
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="w-full md:w-[95%] mx-auto ">
      <div className="w-full md:p-2 ">
        <h1 className=" text-2xl md:text-3xl font-semibold mb-8 relative ">
          Popular Courses
        </h1>

        <div className=" w-full grid grid-flow-col md:p-2 lg:flex justify-evenly gap-5 overflow-x-scroll md:overflow-hidden">
          {data?.length > 0 ? (
            data?.map((course) => (
              <div
                key={course?.id}
                className="bg-white flex-col shadow-md h-[300px] md:h-fit w-[250px] md:w-[280px] border-b-1 rounded-lg p-2 hover:shadow-md"
              >
                <img
                  src={course?.imagePath}
                  alt={course?.courseName}
                  className="w-full h-[170px] object-contain rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold truncate">
                  {course?.courseName}
                </h2>
                <p className="text-gray-700">
                  Instructor: {course?.instructorName}
                </p>
                <p className="text-green-500 font-bold">{course?.price}</p>
                <p className="text-yellow-500 font-semibold">
                  Rating: {course?.rating} ⭐
                </p>
                <Link
                  to={
                    sessionStorage.getItem("token")
                      ? `/courses/coursedetails/${course._id}`
                      : "/login"
                  }
                  className="hidden md:inline-block md:mt-4 text-blue-500"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No courses found based on your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Course;
