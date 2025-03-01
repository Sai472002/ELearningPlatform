import React, { useEffect, useState } from "react";
import { Rate } from "antd";
import { useNavigate } from "react-router-dom";

const CourseCards = ({ coursedata, my }) => {
  const navigate = useNavigate();

  return (
    <div className="h-fit w-full p-2 lg:pt-4 grid gap-2 lg:gap-4 grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap transition-all duration-700">
      {coursedata.length > 0 &&
        coursedata?.map((v, i) => (
          <button
            key={i}
            className="border rounded-lg p-4 max-h-64 min-h-48 lg:max-h-72 lg:min-h-80 lg:max-w-72 lg:min-w-72 hover:shadow-md transition-all duration-500 bg-white flex flex-col gap-2 relative"
            onClick={() => navigate(`/courses/coursedetails/${v._id}`)}
          >
            <div className=" bg-gray-50 h-full">
              <img src={v.imagePath} className="rounded-md h-full" />
            </div>
            <div className="text-xs md:text-base flex w-full items-center justify-between font-bold tracking-widest text-gray-600">
              <p>{v?.courseName?.trim()}</p>
              <p className="font-normal text-[10px]">{v?.duration.trim()}</p>
            </div>
            <Rate
              defaultValue={parseInt(v.rating)}
              disabled
              className={`text-xs ${my === true ? "ml-0" : "mx-auto"} w-fit`}
            />
            {!my ? (
              <div className="w-full text-xs md:text-base flex items-center justify-between mt-4">
                <p className="font-bold tracking-wider text-gray-500">Price</p>
                <p className="font-mono text-Primary">
                  {v?.price ? "$" + " " + v?.price : "free"}
                </p>
              </div>
            ) : null}
          </button>
        ))}
    </div>
  );
};

export default CourseCards;
