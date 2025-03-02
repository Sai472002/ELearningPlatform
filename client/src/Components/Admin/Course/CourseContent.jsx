import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET } from "../../ApiFunction/ApiFunction";
import { Collapse } from "antd";
import CustomAvatar from "../../Common/CustomAvatar";
import {
  CaretRightOutlined,
  ContactsFilled,
  DoubleLeftOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { action } from "../../Url/url";

const CourseDetails = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [temp, setTemp] = useState([]);

  const getCourse = async () => {
    const data = await GET(`${action.GET_COURSE}/${_id}`);
    const result = await GET(action.GET_ALL_INS);
    const filter = result?.data?.filter(
      (v) => v.userId == data[0]?.instructorId
    );
    setTemp(data?.map((v) => ({ ...v, instructorDetails: filter })));
  };

  useEffect(() => {
    getCourse();
  }, []);

  const subItems = (item, index) => {
    return item?.rows?.map((title, index) => ({
      label: (
        <div className="flex justify-between items-center">
          <p className="text-Primary font-Poppins ">{title?.title} </p>
          <small className="text-gray-500 font-Poppins ">
            {title?.lectureDuration}
          </small>
        </div>
      ),
      children: (
        <div className="py-2 sm:px-4 grid">
          <p className="font-medium font-Koulen">Course description</p>
          <p className="p-2 text-gray-500 border min-h-28 rounded-lg mt-2">
            {title?.description}
          </p>
          <p className="font-medium font-Koulen mt-2">
            What will you learn this section ?
          </p>
          <p className="p-2 text-gray-500 border min-h-28 rounded-lg mt-2">
            {title?.learn}
          </p>
        </div>
      ),
    }));
  };

  return (
    <>
      {temp?.length > 0 &&
        temp?.map((item, index) => (
          <div className="sm:flex h-full w-full relative">
            <div className="sm:w-[25%] bg-white flex gap-4 flex-col pr-4">
              <h1 className="lg:text-xl font-semibold pb-2 ">
                <DoubleLeftOutlined
                  onClick={() => navigate(-1)}
                  className="text-Primary bg-Primary/10 hover:scale-125 duration-300 mr-2 rounded-full p-1 border-Primary !text-base"
                />
                Course Details
              </h1>
              <p className="bg-Primary/10 rounded-md text-Primary p-2 text-center mb-2 tracking-widest">
                {item?.courseName}
              </p>
              {item?.instructorDetails?.map((ins) => (
                <div className="flex flex-col items-center gap-3 mr-auto rounded bg-gray-50 p-4">
                  <CustomAvatar
                    editable={false}
                    name={ins?.username}
                    imagepath={ins?.imagepath}
                    className="md:size-24"
                  />
                  <p className="text-Primary capitalize bg-white p-2">
                    <span className="text-gray-500">Instructor : </span>
                    {ins?.username}
                  </p>
                  <small>
                    <PhoneOutlined className="text-Primary mr-2" />
                    {ins?.phonenumber}
                  </small>
                </div>
              ))}
              <p className="text-xs md:text-sm text-Primary">Requirements</p>
              <div className="text-xs md:text-sm p-2 min-h-40 text-gray-600">
                <ol className="list-inside list-decimal leading-relaxed">
                  {item?.requirements?.map((v, i) => (
                    <li key={i}>{v}</li>
                  ))}
                </ol>
              </div>
            </div>
            <div className=" h-full flex-1 overflow-y-scroll bg-gray-100 p-2 rounded-lg">
              <p className="bg-white p-4 text-sm lg:text-base text-Primary">
                video <VideoCameraOutlined className="ml-2" />
              </p>
              <div className="p-4 gap-1 bg-white relative ">
                <video
                  controls={true}
                  muted
                  className="h-full bg-gray-100 w-full mx-auto"
                >
                  <source src={`${item?.videoPath}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="mt-4">
                  <p className="text-sm font-medium">
                    Duration :{" "}
                    <span className="rounded-lg font-light text-xs tracking-widest bg-gray-100 p-1 px-2 capitalize">
                      {item?.duration}
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
                className="bg-white lg:px-4 py-4"
              />
            </div>
          </div>
        ))}
    </>
  );
};

export default CourseDetails;
