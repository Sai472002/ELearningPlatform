import React, { useEffect, useState } from "react";
import CustomTable from "../../Common/CustomTable";
import { DELETE, GET } from "../../ApiFunction/ApiFunction";
import { useCustomMessage } from "../../Common/CustomMessage";
import { action } from "../../Url/url";
const Request = () => {
  const [request, setRequest] = useState([]);
  const showMessage = useCustomMessage();
  const fetch = async () => {
    const res = await GET(action.GET_REQ);
    setRequest(res);
  };

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
      window.location.reload();
    } else {
      showMessage("error", res.data.message);
    }
    fetch();
  };

  return (
    <div className="grid gap-4">
      <h1 className="lg:text-lg font-semibold text-gray-700 flex gap-2 ">
        Request{" "}
        <p className="rounded-full text-sm h-[30px] w-[30px] flex items-center justify-center bg-Primary text-white ">
          {request?.length}
        </p>
      </h1>
      <CustomTable
        columns={header}
        data={request}
        approveBtn
        viewModal={(v, i, view) => {
          handleRequest(i, v);
        }}
      />
    </div>
  );
};

export default Request;
