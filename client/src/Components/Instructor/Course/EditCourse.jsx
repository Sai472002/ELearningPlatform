import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import CustomInput from "../../Common/CustomInput";
import CustomButton from "../../Common/CustomButton";
import axios from "axios";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Upload } from "antd";
import { useCustomMessage } from "../../Common/CustomMessage";
import { PUTFILE } from "../../ApiFunction/ApiFunction";
import CustomDropdown from "../../Common/CustomDropdown";
import { action } from "../../Url/url";

function EditCourse() {
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
  const location = useLocation();
  const data = location.state;
  const showMessage = useCustomMessage();
  const [editdata, setEditdata] = useState({
    courseName: data.courseName,
    courseType: data.courseType,
    subTopic: data.subTopic,
    duration: data.duration,
    rating: data.rating || "",
    price: data.price || "",
    rows: data.rows || "",
    requirements: data.requirements,
    instructorName: data.instructorName,
    instructorId: data.instructorId,
    imagePath: data.imagePath,
    imageName: data.imageName,
    videoName: data.videoName,
    videoPath: data.videoPath,
  });
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

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
    {
      label: "Rating",
      placeholder: "Enter rating",
      key: "rating",
      disable: true,
    },
    { label: "Duration", placeholder: "Enter duration", key: "duration" },
  ];

  const navigate = useNavigate();
  let formData = new FormData();

  const handleInputChange = (key, value) => {
    setEditdata((prevData) => ({ ...prevData, [key]: value }));
  };
  const handleArrayChange = (index, key, value) => {
    setEditdata((prevData) => ({
      ...prevData,
      rows: prevData.rows.map((row, idx) =>
        idx === index ? { ...row, [key]: value } : row
      ),
    }));
  };

  const addNewRow = () => {
    setEditdata((prevData) => ({
      ...prevData,
      rows: [
        ...prevData.rows,
        { title: "", lectureDuration: "", description: "", learn: "" },
      ],
    }));
  };
  const handleRequirementChange = (field, index, value) => {
    setEditdata({
      ...editdata,
      [field]: editdata[field].map((item, idx) =>
        idx === index ? value : item
      ),
    });
    console.log(editdata);
  };

  const handleDelete = (index, text) => {
    if (text === "requirement") {
      const updatedRequirements = [...editdata.requirements]; // Create a copy of the array
      updatedRequirements.pop(); // Remove the last item from the array
      setEditdata({
        ...editdata,
        requirements: updatedRequirements, // Update the requirements array by removing the item at the specified index
      });
    } else {
      const updatedRows = [...editdata.rows]; // Create a copy of the array
      updatedRows.pop(); // Remove the last item from the array
      setEditdata({
        ...editdata,
        rows: updatedRows, // Update the requirements array by removing the item at the specified index
      });
    }
  };

  const handleSubmit = async () => {
    if (editdata.courseType === "select") {
      return showMessage("info", "course Type is required");
    }
    let allRowsValid = false;
    allRowsValid = editdata.rows.every((row) => {
      return ["title", "lectureDuration", "description", "learn"].every(
        (key) => row[key] && row[key].trim() !== "" // Ensure field is not empty or just spaces
      );
    });

    if (!allRowsValid) {
      return showMessage("info", "Please enter all content fields.");
    }
    setLoading(true);
    const token = sessionStorage.getItem("token");

    Object.keys(editdata).forEach((key) => {
      if (key === "rows") {
        // Handle rows separately
        editdata.rows.forEach((row, index) => {
          Object.keys(row).forEach((field) => {
            formData.append(`rows[${index}][${field}]`, row[field]);
          });
        });
      } else if (Array.isArray(editdata[key])) {
        editdata[key].forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, editdata[key]);
      }
    });

    if (image) formData.append("image", image);
    if (video) formData.append("video", video);
    const _id = data._id;

    try {
      const result = await PUTFILE(`${action.EDIT_COURSE}/${_id}`, formData);

      if (result.status === 200) {
        setLoading(false);

        showMessage("success", "Course updated successfully!");
        navigate(-1);
      }
    } catch (error) {
      setLoading(false);

      showMessage("error", "Error updating course. Please try again.");
      console.error("Error updating course:", error);
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
    },
  };

  return (
    <div className="grid gap-4 md:gap-6 lg:gap-8">
      <span className="text-xl border-b pb-4">Edit Course</span>
      <table className="table-auto w-fit ">
        <tbody className="">
          {inputFields.map(
            ({ label, placeholder, key, type = "text", disable }) => (
              <tr key={key} className="grid grid-cols-1 md:grid-cols-2">
                <td className="px-4 py-2 font-medium">{label}</td>
                <td className="md:px-4 py-2">
                  <CustomInput
                    placeholder={placeholder}
                    className="w-full"
                    containerClassName="p-2 flex items-center gap-4"
                    type={type}
                    disabled={disable}
                    value={editdata[key] || ""}
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
            )
          )}
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
                value={editdata.courseType}
                menus={expertiseLists}
                onChange={(e) => setEditdata({ ...editdata, courseType: e })}
              />
            </td>
          </tr>
          {editdata.requirements.map((requirement, index) => (
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
                        setEditdata({
                          ...editdata,
                          requirements: [...editdata.requirements, ""],
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

          {editdata.rows?.map((row, rowIndex) => (
            <div className="p-4">
              <div className="flex gap-2 ">
                Content {rowIndex + 1}
                <span className="text-red-500 mx-1 text-xs bg-red-50 rounded-md p-1">
                  required
                </span>
              </div>
              <tr
                key={rowIndex}
                className="bg-gray-50 border grid grid-cols-1 rounded-lg md:grid-cols-2 my-4 text-gray-600 p-4 pt-8 capitalize items-center relative"
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
                          key={key}
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
      <div className=" flex gap-5 text-base p-2">
        <label>Image</label>
        <Upload {...props.image}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        {editdata.imageName && (
          <div className="text-gray-500 text-sm">
            FileName: <span className="font-medium">{editdata.imageName}</span>
          </div>
        )}
      </div>
      <div className=" flex gap-5 text-base p-2">
        <label>Video</label>
        <Upload {...props.video}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        {editdata.videoName && (
          <div className="text-gray-500 text-sm">
            FileName: <span className="font-medium">{editdata.videoName}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {["submit", "cancel"].map((v) => (
          <CustomButton
            title={v === "submit" ? "Submit" : "Cancel"}
            onClick={() => (v === "submit" ? handleSubmit() : navigate(-1))}
            loading={loading}
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
export default EditCourse;
