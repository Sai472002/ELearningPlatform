import React, { useState } from "react";
import { Link } from "react-router-dom";
import js from "../../../Assets/CourseCatalog/Js.jpg";
import Reactfundamental from "../../../Assets/CourseCatalog/React.jpg";
import nodejs from "../../../Assets/CourseCatalog/Node.jpg";
import css from "../../../Assets/CourseCatalog/css.jpg";

const courses = [
  {
    id: 1,
    image: js,
    title: "JavaScript Basics",
    instructor: "John Doe",
    price: "$49",
    category: "Programming",
    rating: 4.5,
  },
  {
    id: 2,
    image: Reactfundamental,
    title: "React Fundamentals",
    instructor: "Jane Smith",
    price: "$59",
    category: "Frontend Development",
    rating: 4.7,
  },
  {
    id: 3,
    image: nodejs,
    title: "Node.js for Beginners",
    instructor: "Alex Brown",
    price: "$39",
    category: "Backend Development",
    rating: 4.3,
  },
  {
    id: 4,
    image: css,
    title: "CSS for Beginners",
    instructor: "Emily Davis",
    price: "$29",
    category: "Frontend Development",
    rating: 4.8,
  },
];

const Course = () => {
  return (
    <div className="w-[90%] mx-auto ">
      <div className="md:w-full p-6 ">
        <h1 className=" text-2xl md:text-3xl font-semibold mb-8 relative ">
          Popular Courses
        </h1>

        <div className="flex flex-wrap justify-evenly gap-5">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course.id}
                className="bg-white flex-col md:w-[280px] shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-blue-50"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-contain rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <p className="text-gray-700">Instructor: {course.instructor}</p>
                <p className="text-green-500 font-bold">{course.price}</p>
                <p className="text-yellow-500 font-semibold">
                  Rating: {course.rating} ⭐
                </p>
                <Link
                  to={`/courses/${course.id}`}
                  className="inline-block mt-4 text-blue-500"
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
