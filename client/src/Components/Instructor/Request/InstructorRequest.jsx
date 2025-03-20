import React, { useEffect, useMemo, useState } from "react";
import CustomTable from "../../Common/CustomTable";
import { DELETE, GET } from "../../ApiFunction/ApiFunction";
import { useCustomMessage } from "../../Common/CustomMessage";
import { action } from "../../Url/url";
const InstructorRequest = () => {
  const [request, setRequest] = useState([]);
  const showMessage = useCustomMessage();
  const [active, setActive] = useState(0);

  const buttonOption = [
    { name: "View All", color: "#334155" },
    { name: "Pending", color: "#eab308" },
    { name: "Approved", color: "#349C5E" },
    { name: "Rejected", color: "#f43f5e" },
  ];

  const fetch = async () => {
    const res = await GET(action.GET_REQ);
    setRequest(res);
  };

  const filterData = useMemo(() => {
    if (active !== 0) {
      return request.filter((a) => a.status === buttonOption[active].name);
    }
    return request;
  }, [active, request]);

  useEffect(() => {
    fetch();
  }, []);

  const header = [
    {
      title: "Course Name",
      dataIndex: "coursename",
      key: "coursename",
      render: (text, record) => (
        <div className="flex flex-col lg:flex-row gap-2 items-center">
          <img
            src={record.imagePath ? `${record.imagePath}` : "default-image.jpg"}
            alt="Course"
            className="rounded h-10  object-cover"
          />
          <span className="!text-gray-500">{text ? text : "- - -"}</span>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Requested",
      dataIndex: "requestat",
      key: "requestat",
      render: (text) => (
        <small className="text-gray-500">{text ? text : "- - -"}</small>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (text) => (
        <small
          className={` py-1 rounded-full px-2 text-center ${
            text === "Pending"
              ? "text-amber-600 bg-amber-50"
              : text === "Approved"
              ? "text-green-600 bg-green-50"
              : "text-red-600 bg-red-50"
          }`}
        >
          {text ? text : "- - -"}
        </small>
      ),
    },
  ];

  const handleRequest = async (reqid, data) => {
    const { courseid } = data;
    const res = await DELETE(`${action.DEL_REQ}/${courseid}/${reqid}`);
    if (res.status === 200) {
      showMessage("success", res.data.message);
    } else {
      showMessage("error", res.data.message);
    }
    fetch();
  };

  return (
    <div className="grid gap-4">
      <h1 className="lg:text-lg font-semibold text-gray-700 tracking-wide flex gap-2">
        Requests{" "}
        <p className="rounded-full text-sm h-[30px] w-[30px] flex items-center justify-center bg-Primary text-white ">
          {request.length}
        </p>
      </h1>
      <div className="flex items-center gap-3">
        {buttonOption.map((a, i) => (
          <button
            key={i}
            className="p-2 rounded text-xs border duration-500 transition-all"
            style={{
              backgroundColor: active === i ? a.color : "white",
              color: active === i ? "white" : a.color,
              borderColor: a.color,
            }}
            onClick={() => setActive(i)}
          >
            {a.name}
          </button>
        ))}
      </div>
      <CustomTable
        columns={header}
        data={filterData}
        approveBtn
        viewModal={(v, i) => {
          handleRequest(i, v);
        }}
      />
    </div>
  );
};

export default InstructorRequest;
