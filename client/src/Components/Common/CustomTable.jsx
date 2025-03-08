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
  rowClick = (i, e) => {},
  viewModal = (data, i) => {},
  approveBtn = false,
  deleteBtn = true,
  deleteFunction = (data) => {},
  editFunction = (data) => {},
  editBtn = true,
}) => {
  const navigate = useNavigate();
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
            src={record.imagePath ? `${record.imagePath}` : "default-image.jpg"}
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
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div
          className="flex gap-2 justify-evenly"
          onClick={(e) => e.stopPropagation()}
        >
          <CustomButton
            type="edit"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(record);
            }}
          />
          <Popconfirm
            title="Raise Delete Request"
            description="Are you sure ?"
            onConfirm={(e) => {
              e.stopPropagation();
              handleDelete(record);
            }}
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
              fixed: "right",
              width: 100,
              render: (_, record) => (
                <div
                  className={`flex gap-2 justify-evenly ${
                    (record.status === "Approved" ||
                      record.status === "Rejected") &&
                    "cursor-not-allowed grayscale"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {editBtn === true && approveBtn === false && (
                    <CustomButton
                      type="edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(record);
                      }}
                    />
                  )}
                  {deleteBtn === true && approveBtn === false && (
                    <Popconfirm
                      title="Delete the Course"
                      description="Are you sure to delete this course?"
                      onConfirm={(e) => {
                        e.stopPropagation();
                        handleDelete(record);
                      }}
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
                        disabled={record.status === "Pending" ? false : true}
                        onClick={(e) => {
                          e.stopPropagation();
                          viewModal(record, 1, true);
                        }}
                      />
                      <CustomButton
                        type="reject"
                        disabled={
                          record.status == "Approved" ||
                          record.status == "Rejected"
                            ? true
                            : false
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          viewModal(record, 2, true);
                        }}
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
  }, [data]);

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
    const id = record._id;
    rowClick(id, record);
  };

  return (
    <div className="overflow-x-scroll lg:overflow-x-hidden">
      <Table
        bordered
        size="small"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          className: "cursor-pointer",
        })}
        columns={defaultColumn}
        dataSource={coursedata}
        pagination={{
          pageSize: 10,
          position: "bottomRight",
        }}
        scroll={{
          x: "max-content",
        }}
      />
    </div>
  );
};

export default CustomTable;
