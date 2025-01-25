import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET, POST } from "../../ApiFunction/ApiFunction";
import { Collapse } from "antd";
import {
  CaretRightOutlined,
  DoubleLeftOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import CustomButton from "../../Common/CustomButton";
const CourseDetails = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [temp, setTemp] = useState([]);

  const getCourse = async () => {
    const data = await GET(`http://localhost:3000/getcourse/${_id}`);
    setTemp(data);
  };
  console.log(temp);
  
  useEffect(() => {
    getCourse();
  }, []);

  const subItems = (item, index) => {
    return item.title.map((title, index) => ({
      label: (
        <div className="flex justify-between items-center">
          <p className="text-Primary font-Poppins ">{title} </p>
          <small className="text-gray-500 font-Poppins ">
            {item.lectureDuration[index]}
          </small>
        </div>
      ),
      children: (
        <div className="py-2 sm:px-4 grid">
          <p className="font-medium font-Koulen">Course description</p>
          <p className="p-2 text-gray-500 border min-h-28 rounded-lg mt-2">
            {item.description[index]}
          </p>
          <p className="font-medium font-Koulen mt-2">
            What will you learn this section ?
          </p>
          <p className="p-2 text-gray-500 border min-h-28 rounded-lg mt-2">
            {item.learn[index]}
          </p>
        </div>
      ),
    }));
  };

  return (
        <>
        {temp.length > 0 &&
          temp.map((item, index) => (
            <div className="sm:flex h-full md:h-[90vh] w-full border relative">
              <div className="sm:w-fit bg-white border flex gap-4 p-4 flex-col">
                <h1 className="lg:text-xl font-semibold pb-2 ">
                  <DoubleLeftOutlined
                    onClick={() => navigate(-1)}
                    className="text-Primary bg-Primary/10 hover:scale-125 duration-300 mr-2 rounded-full p-1 border-Primary !text-base"
                  />
                  Course Details
                </h1>
                <p className="bg-Primary/10 rounded-md text-Primary p-2 text-center mb-2 tracking-widest">
                  {item.courseName}
                </p>
                <p className="text-xs md:text-sm text-Primary">Requirements</p>
                <div className="text-xs max-w-96 p-2 min-h-40 ">
                  {item.title.map((v) => (
                    <ol className="list-disc list-inside leading-relaxed">
                      <li>{v}</li>
                    </ol>
                  ))}
                </div>
              </div>
              <div className=" h-full bg-gray-100 sm:pr-0 sm:pb-0 flex-1 overflow-y-scroll">
                <p className="bg-white p-4 m-2 mb-0 text-sm lg:text-base text-Primary">
                  video <VideoCameraOutlined className="ml-2" />
                </p>
                <div className="p-4 gap-1 mx-2 bg-white relative ">
                  {!item.isPaid && (
                    <div
                      className={`h-full backdrop-grayscale w-full top-0 left-0 absolute`}
                    />
                  )}
                  <video
                    controls={item.isPaid}
                    muted
                    className="h-full bg-gray-100 w-full mx-auto"
                  >
                    <source
                      src={`http://localhost:3000${item.videoPath}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <div className="mt-4">
                    <p className="text-sm font-medium">
                      Duration :{" "}
                      <span className="rounded-lg font-light text-xs tracking-widest bg-gray-100 p-1 px-2 capitalize">
                        {item.duration}
                      </span>
                    </p>
                  </div>
                </div>
                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined
                      className="!text-Primary"
                      rotate={isActive ? 90 : 0}
                    />
                  )}
                  items={subItems(item, index)}
                  className="bg-white lg:px-4 py-4 mx-2"
                />
                {!item.isPaid && (
                  <div className="drop-shadow-lg flex items-center justify-between p-2 bg-gradient-to-r from-white to-transparent backdrop-blur-sm w-full border-t sticky left-0 bottom-0 ">
                    <p className="font-bold font-Poppins !tracking-wider">
                      Price
                    </p>
                    <p className="mr-auto ml-4 font-medium ">
                      {temp[0].price || "free"}
                    </p>
                    <CustomButton
                      title="buy"
                      color="solid"
                      className="bg-Primary"
                      onClick={() =>
                        navigate(`/courses/coursepayment/${_id}`, {
                          state: item,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
          </>
  );
};

export default CourseDetails;
