import React, { useState } from "react";
import CustomButton from "../../Common/CustomButton";
import CustomInput from "../../Common/CustomInput";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCustomMessage } from "../../Common/CustomMessage";
import { POST, POSTFILE } from "../../ApiFunction/ApiFunction";
import CustomDropdown from "../../Common/CustomDropdown";
import { action } from "../../Url/url";

function AddCourse() {
  const showMessage = useCustomMessage();
  const expertiseLists = [
    {
      label: "Select",
      value: "select",
    },
    {
      label: "Technology",
      value: "Technology",
    },
    {
      label: "Business",
      value: "Business",
    },
    {
      label: "Programming",
      value: "Programming",
    },
    {
      label: "Design",
      value: "Design",
    },
    {
      label: "Personal Development",
      value: "Personal Development",
    },
  ];
  const [courseData, setCourseData] = useState({
    courseName: "",
    subTopic: "",
    duration: "",
    courseType: "select",
    price: "",
    rows: [{ title: "", lectureDuration: "", description: "", learn: "" }],
    requirements: [""],
    instructorName: "",
    instructorId: "",
  });
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputFields = [
    {
      label: "Course Name",
      placeholder: "Enter course name",
      key: "courseName",
    },
    { label: "Sub Topic", placeholder: "Enter sub topic", key: "subTopic" },
    {
      label: "Price",
      placeholder: "Enter price",
      key: "price",
      type: "number",
    },
    { label: "Duration", placeholder: "Enter duration", key: "duration" },
  ];

  const handleInputChange = (key, value) => {
    setCourseData((prevData) => ({ ...prevData, [key]: value }));
  };
  const handleArrayChange = (index, key, value) => {
    setCourseData((prevData) => ({
      ...prevData,
      rows: prevData.rows.map((row, idx) =>
        idx === index ? { ...row, [key]: value } : row
      ),
    }));
  };

  const addNewRow = () => {
    setCourseData((prevData) => ({
      ...prevData,
      rows: [
        ...prevData.rows,
        { title: "", lectureDuration: "", description: "", learn: "" },
      ],
    }));
  };

  const handleSubmit = async () => {
    // Check if all rows and all fields inside rows have values
    if (courseData.courseType === "select") {
      return showMessage("info", "course type is required");
    }
    let allRowsValid = false;
    allRowsValid = courseData.rows.every((row) => {
      return ["title", "lectureDuration", "description", "learn"].every(
        (key) => row[key] && row[key].trim() !== "" // Ensure field is not empty or just spaces
      );
    });

    if (!allRowsValid) {
      return showMessage("info", "Please enter all content fields.");
    }
    if (image === null) {
      return showMessage("info", "image is required");
    } else if (video === null) {
      return showMessage("info", "video is required");
    }
    setLoading(true);
    const token = sessionStorage.getItem("token");
    let formData = new FormData();

    // Append normal fields to formData
    Object.keys(courseData).forEach((key) => {
      if (key === "rows") {
        // Handle rows separately
        courseData.rows.forEach((row, index) => {
          Object.keys(row).forEach((field) => {
            formData.append(`rows[${index}][${field}]`, row[field]);
          });
        });
      } else if (Array.isArray(courseData[key])) {
        courseData[key].forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, courseData[key]);
      }
    });

    // Append files (image and video) to formData
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);

    try {
      const response = await POSTFILE(action.ADD_COURSE, formData, token);
      if (response.status === 200) {
        setLoading(false);
        showMessage("success", "Course added successfully");
        navigate(-1);
      } else {
        setLoading(false);
        showMessage("error", "Course addition failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading course", error);
    }
  };

  const props = {
    image: {
      beforeUpload: (file) => {
        if (file.size > 10 * 1024 * 1024) {
          // 10MB
          showMessage("info", "Image file size should be less than 10MB.");
          return false;
        }
        setImage(file);
        return false;
      },
      onRemove: () => {
        setImage(null);
      },
      fileList: image ? [image] : [],
    },

    video: {
      beforeUpload: (file) => {
        if (file.size > 10 * 1024 * 1024) {
          // 10MB
          showMessage("info", "Video file size should be less than 10MB.");
          return false;
        }
        setVideo(file);
        return false;
      },
      onRemove: () => {
        setVideo(null);
      },
      fileList: video ? [video] : [],
    },
  };

  const handleRequirementChange = (field, index, value) => {
    setCourseData({
      ...courseData,
      [field]: courseData[field].map((item, idx) =>
        idx === index ? value : item
      ),
    });
  };

  const handleDelete = (index, text) => {
    if (text === "requirement") {
      const updatedRequirements = [...courseData.requirements]; // Create a copy of the array
      updatedRequirements.pop(); // Remove the last item from the array
      setCourseData({
        ...courseData,
        requirements: updatedRequirements, // Update the requirements array by removing the item at the specified index
      });
    } else {
      const updatedRows = [...courseData.rows]; // Create a copy of the array
      updatedRows.pop(); // Remove the last item from the array
      setCourseData({
        ...courseData,
        rows: updatedRows, // Update the requirements array by removing the item at the specified index
      });
    }
  };

  return (
    <div className="grid gap-4 md:gap-6 lg:gap-8">
      <span className="text-xl">Add Course</span>
      <table className="table-auto w-fit">
        <tbody>
          {inputFields.map(({ label, placeholder, key, type = "text" }) => (
            <tr key={key} className="grid grid-cols-1 md:grid-cols-2">
              <td className="px-4 py-2 font-medium">{label}</td>
              <td className="md:px-4 py-2">
                <CustomInput
                  placeholder={placeholder}
                  className="w-full"
                  containerClassName="p-2 flex items-center gap-4"
                  type={type}
                  suffix={
                    key === "duration" && (
                      <ClockCircleOutlined className="text-Primary" />
                    )
                  }
                  disabled={key === "rating" ? true : false}
                  onChange={(e) =>
                    handleInputChange(
                      key,
                      type === "number"
                        ? parseFloat(e.target.value)
                        : e.target.value
                    )
                  }
                />
              </td>
            </tr>
          ))}
          <tr className="grid grid-cols-1 md:grid-cols-2 ">
            <td className="px-4 py-2 font-medium">
              Course Type{" "}
              <span className="text-red-500 mx-1 text-xs bg-red-50 rounded-md p-1">
                required
              </span>
            </td>
            <td className="md:px-6 py-2">
              <CustomDropdown
                type="select"
                className="w-full"
                value={courseData.courseType}
                menus={expertiseLists}
                onChange={(e) =>
                  setCourseData({ ...courseData, courseType: e })
                }
              />
            </td>
          </tr>
          {courseData.requirements.map((requirement, index) => (
            <tr
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 items-center"
            >
              <td
                className={`px-4 py-2 font-medium ${
                  index !== 0 && "text-right"
                }`}
              >
                {index === 0 ? (
                  <div className="flex items-center justify-between">
                    <p>Requirement</p>
                    <PlusOutlined
                      className="p-2 bg-green-400 text-white rounded-lg"
                      onClick={() =>
                        setCourseData({
                          ...courseData,
                          requirements: [...courseData.requirements, ""],
                        })
                      }
                    />
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="p-1 px-2 text-sm rounded-full text-Primary bg-Primary/10">
                      {index + 1}
                    </span>
                    <DeleteOutlined
                      className="text-white bg-red-500 p-1 rounded-lg"
                      onClick={() => handleDelete(index, "requirement")}
                    />
                  </div>
                )}
              </td>
              <td className="md:px-4 py-2">
                <CustomInput
                  placeholder="Enter requirement"
                  className="w-full"
                  containerClassName="p-2 flex items-center gap-4"
                  value={requirement}
                  onChange={(e) =>
                    handleRequirementChange(
                      "requirements",
                      index,
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>
          ))}

          {courseData.rows?.map((row, rowIndex) => (
            <div className="p-4">
              <p>
                Content <small>{rowIndex + 1}</small>
                <span className="text-red-500 mx-1 text-xs bg-red-50 rounded-md p-1">
                  required
                </span>
              </p>
              <tr
                key={rowIndex}
                className="bg-gray-50 border grid grid-cols-1 rounded-lg md:grid-cols-2 my-4 text-gray-600 p-4 capitalize items-center relative"
              >
                {rowIndex !== 0 && (
                  <MinusCircleOutlined
                    className="text-red-500 absolute top-1 right-1"
                    onClick={() => handleDelete(rowIndex)}
                  />
                )}
                {["title", "lectureDuration", "description", "learn"].map(
                  (key) => (
                    <>
                      <td>{key}</td>
                      <td key={key} className="pr-4 py-2 ">
                        <CustomInput
                          placeholder={`Enter ${key}`}
                          className="w-full p-2"
                          containerClassName="p-2"
                          value={row[key]}
                          onChange={(e) =>
                            handleArrayChange(rowIndex, key, e.target.value)
                          }
                        />
                      </td>
                    </>
                  )
                )}
              </tr>
            </div>
          ))}
          <tr className="mt-4 ">
            <td className="px-4">
              <CustomButton
                title="Add content"
                onClick={addNewRow}
                color="solid"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex gap-5 text-base p-2">
        <label>Image</label>
        <Upload {...props.image}>
          <CustomButton
            icon={<UploadOutlined />}
            title="Upload"
            variant="filled"
          />
        </Upload>
        <span className="text-red-500 mx-1 text-xs bg-red-50 rounded-md h-fit p-1">
          {!image && "required"}
        </span>
      </div>
      <div className="flex gap-5 text-base p-2">
        <label>Video</label>
        <Upload {...props.video}>
          <CustomButton
            icon={<UploadOutlined />}
            title="Upload"
            variant="filled"
          />
        </Upload>
        <span className="text-red-500 mx-1 text-xs bg-red-50 rounded-md h-fit p-1">
          {!video && "required"}
        </span>
      </div>
      <div className="flex items-center gap-4">
        {["submit", "cancel"].map((v) => (
          <CustomButton
            title={v === "submit" ? "Submit" : "Cancel"}
            onClick={() => (v === "submit" ? handleSubmit() : navigate(-1))}
            loading={v === "submit" && loading}
            disabled={v === "Cancel" && loading}
            variant="default"
            className={`py-5 font-bold tracking-wider w-fit text-white capitalize ${
              v === "submit" ? "bg-Primary" : "bg-gray-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default AddCourse;
