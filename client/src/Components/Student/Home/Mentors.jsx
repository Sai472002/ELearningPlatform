import React from "react";
import mentorImg from "../../../Assets/Images/mentor-1.jpg";
import mentorOne from "../../../Assets/Images/mentor-2.jpg";
import mentorTwo from "../../../Assets/Images/mentor-4.png";
import mentorThree from "../../../Assets/Images/mentor-3.jpg";
const Mentors = () => {
  const mentorsList = [
    { image: mentorImg, name: "Vignesh", status: "developer" },
    { image: mentorThree, name: "Ashok", status: "developer" },
    { image: mentorTwo, name: "Aisu", status: "developer" },
    { image: mentorOne, name: "Gopala Krishnan", status: "developer" },
  ];
  return (
    <div className="w-[90%] m-auto h-fit py-8">
      <h1 className="text-2xl font-semibold drop-shadow md:text-3xl mb-10">
        Learn Form Industrial Experts
      </h1>
      <div className="mx-auto rounded-lg flex flex-col md:flex-row flex-wrap gap-10 md:justify-center lg:justify-around mt-10 md:py-8 lg:p-4">
        {mentorsList.map((each) => (
          <div className="p-2 bg-gradient-to-b from-Primary/10 to-gray-50 md:rounded-full text-sm md:text-base capitalize flex lg:flex-col lg:gap-4 md:w-2/5 lg:w-fit">
            <img
              src={each.image}
              alt="mentors"
              className="border-4 border-white md:rounded-full hover:border z-10 hover:scale-105 transition-all duration-500 bg-white object-contain shadow-md rounded-t-full h-20 w-20 md:h-40 md:w-40 lg:h-60 lg:w-60 mr-2 lg:mr-0"
            />
            <div className="w-full bg-gray-50 border-PrimaryDark/20 md:rounded-r-full border-double border-4 rounded-lg lg:shadow-lg scale-100 transition-all duration-500">
              <p className="uppercase text-[8px] md:text-xs text-gray-800 text-right lg:mb-2 bg-green-200 ml-auto w-fit px-1 md:p-1 rounded-md">
                {each.status}
              </p>
              <p className="text-xl w-4/5 md:w-full lg:text-center px-2">{each.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentors;
