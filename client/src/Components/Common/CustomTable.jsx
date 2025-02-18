import { Dropdown, Rate, Table } from "antd";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCustomMessage } from "./CustomMessage";
import { message, Popconfirm } from "antd";

const CustomTable = ({
  data = [],
  columns = [],
  rowClick,
  viewModal = (data, i) => {},
  approveBtn = false,
  deleteBtn = true,
  deleteFunction = (data) => {},
  editFunction = (data) => {},
  editBtn = true,
}) => {
  const [updateId, setUpdateId] = useState(false);
  const [coursedata, setCoursedata] = useState([]);
  const validate = sessionStorage.getItem("designation");
  const [defaultColumn, setDefaultColumn] = useState([
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      render: (text, record) => (
        <div className="flex flex-col lg:flex-row gap-2 items-center">
          <img
            src={
              record.imagePath
                ? `${record.imagePath}`
                : "default-image.jpg"
            }
            alt="Course"
            className="rounded h-10  object-cover"
          />
          <span className="!text-gray-500">{text ? text : "- - -"}</span>
        </div>
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      width: 50,
      align: "center",
      render: (text) => (
        <small
          className={
            text
              ? "bg-Primary/10 p-1 py-[3px] font-bold border-2 border-Primary/50 rounded-full text-Primary text-[10px]"
              : "text-gray-700"
          }
        >
          {text ? text : "- - -"}
        </small>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      align: "center",
      render: (text) => (
        <Rate className="text-xs" disabled defaultValue={text} />
      ),
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (text) => (
        <small className={text ? "text-green-600" : "text-gray-700"}>
          {text ? text : "- - -"}
        </small>
      ),
    },
    {
      title: "course Type",
      dataIndex: "courseType",
      key: "courseType",
      align: "center",
      render: (text) => (
        <small className={text ? "text-green-600" : "text-gray-700"}>
          {text ? text : "- - -"}
        </small>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 100,
      render: (_, record) => (
        <div className="flex gap-2 justify-evenly">
          <CustomButton type="edit" onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Raise Delete Request"
            description="Are you sure ?"
            onConfirm={() => handleDelete(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <CustomButton type="delete" />
          </Popconfirm>
        </div>
      ),
    },
  ]);

  const { action } = columns;
  useEffect(() => {
    if (columns.length > 0) {
      validate === "Admin" || action === true
        ? setDefaultColumn([
            ...columns,
            {
              title: "Action",
              key: "action",
              align: "center",
              width: 100,
              render: (_, record) => (
                <div className="flex gap-2 justify-evenly">
                  {editBtn === true && approveBtn === false && (
                    <CustomButton
                      type="edit"
                      onClick={() => handleEdit(record)}
                    />
                  )}
                  {deleteBtn === true && approveBtn === false && (
                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      onConfirm={() => handleDelete(record)}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <CustomButton type="delete" />
                    </Popconfirm>
                  )}
                  {approveBtn === true && (
                    <>
                      <CustomButton
                        type="approve"
                        onClick={() => viewModal(record, 1)}
                      />
                      <CustomButton
                        type="reject"
                        onClick={() => viewModal(record, 2)}
                      />
                    </>
                  )}
                </div>
              ),
            },
          ])
        : setDefaultColumn(columns);
    }
    setCoursedata(
      data.map((item) => ({
        ...item,
        width: 120,
      }))
    );
  }, [columns]);

  const cancel = (e) => {
    message.error("Click on No");
  };

  const handleDelete = async (data) => {
    deleteFunction(data);
  };

  const handleEdit = (data) => {
    setUpdateId(true);
    editFunction(data);
  };

  const handleRowClick = (record) => {
    rowClick(record);
  };

  return (
    <>
      <Table
        bordered
        size="small"
        className=""
        // onRow={(record) => ({
        //   onClick: () => handleRowClick(record),
        // })}
        columns={defaultColumn}
        dataSource={coursedata}
        pagination={{
          pageSize: 10,
        }}
      />
    </>
  );
};

export default CustomTable;
