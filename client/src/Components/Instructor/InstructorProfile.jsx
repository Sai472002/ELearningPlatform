import React, { useEffect, useState } from "react";
import CustomDropdown from "../Common/CustomDropdown";
import TextArea from "antd/es/input/TextArea";
import { Radio } from "antd";
import { EditFilled } from "@ant-design/icons";
import CustomButton from "../Common/CustomButton";
import CustomSkeleton from "../Common/CustomSkeleton";
import CustomInput from "../Common/CustomInput";
import { GET, PUT } from "../ApiFunction/ApiFunction";
import { useCustomMessage } from "../Common/CustomMessage";

const InstructorProfile = () => {
  const showMessage = useCustomMessage();

  const [data, setData] = useState([]);
  const [isupdate, setIsupdate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [checkBoxValue, setCheckBoxValue] = useState("male");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");
  const [expertise, setExpertise] = useState("Programming");
  const fetchData = async () => {
    const result = await GET("http://localhost:3000/getinsdata");
    if (result && result.length > 0) {
      setData(result);
      setCheckBoxValue(result[0].gender);
      setAddress(result[0].address);
      setDesignation(result[0].designation);
      setExpertise(result[0].expertise);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const postData = async () => {
    setIsLoading(true);
    let convertedObject = data[0].title.reduce((acc, key) => {
      if (data[0].hasOwnProperty(key)) {
        acc[key] = data[0][key];
      }
      return acc;
    }, {});
    convertedObject.gender = checkBoxValue;
    convertedObject.address = address;
    convertedObject.designation = designation;
    convertedObject.expertise = expertise;
    try {
      const result = await PUT(
        "http://localhost:3000/editinsdata",
        convertedObject
      );
      if (result.status === 200) {
        setIsLoading(false);
        showMessage("success", "Data added Successfully");
      }
    } catch (error) {
      showMessage("error", "Something went wrong");
      setIsLoading(false);
    }
  };
  console.log(data);
  console.log(address);
  const options = [
    {
      label: "male",
      value: "male",
    },
    {
      label: "female",
      value: "female",
    },
    {
      label: "other",
      value: "other",
    },
  ];
  const designationLists = [
    {
      label: "Admin",
      value: "Admin",
    },
    {
      label: "Student",
      value: "Student",
    },
    {
      label: "Instructor",
      value: "Instructor",
    },
  ];
  const expertiseLists = [
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
  const onChange1 = ({ target: { value } }) => {
    console.log("radio1 checked", value);
    setCheckBoxValue(value);
  };
  const handleInputChange = (title, value) => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[0] = {
        ...updatedData[0],
        [title]: value,
      };
      return updatedData;
    });
  };

  const handleButtonClick = () => {
    if (!data[0]) {
      showMessage("error", "Data is missing or not initialized properly");
      return;
    }
    const phonePattern = /^\d{10}$/;  // Ensures the phone number is exactly 10 digits
    const agePattern = /^\d{2}$/;     // Ensures the age is exactly 2 digits

    Object.keys(data[0]).forEach((key) => {
      if (typeof data[0][key] === "string") {
        data[0][key] = data[0][key].trim(); // Trim strings
      }
    });
    
     
    if (!phonePattern.test(data[0].phonenumber)) {
      showMessage("error", "Please enter a valid 10-digit mobile number");
      return;
    } else if (!agePattern.test(data[0].age)) {
      showMessage("error", "Please enter a valid 2-digit age");
      return;
    } else {
      // Proceed with the data submission
      postData();
      setIsupdate(true);
    
    }
  };

  return (
    <div>
      <div className="pb-2 border-b flex items-center justify-between transition-all ">
        <h1 className="font-semibold tracking-wider lg:text-lg">Details</h1>
        <span className="flex items-center">
          <span className="mr-2 hidden lg:block text-gray-400">Edit</span>
          <EditFilled
            onClick={() => setIsupdate(!isupdate)}
            className="shadow duration-500 scale-100 hover:bg-Primary/10 hover:text-Primary p-2 rounded-full"
          />
        </span>
      </div>
      {data.length > 0 ? (
        <form
          className="grid grid-cols-1 mt-4 md:grid-cols-2
         lg:grid-cols-4 gap-4 rounded-lg shadow border p-8 bg-white"
        >
          {data.map((each) =>
            each.title
              .filter((field) => !["gender"].includes(field))
              .map((field) => (
                <CustomInput
                  key={field}
                  disabled={isupdate}
                  className="text-xs"
                  containerClassName="mx-2"
                  titleClassName="text-xs"
                  title={field}
                  type={field === "age" ? "number" : field}
                  value={each[field] || ""}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    handleInputChange(field, newValue);
                  }}
                />
              ))
          )}
          <span className="lg:mx-2">
            <p className="text-xs font-normal mb-4 capitalize text-gray-700">
              gender
            </p>
            <Radio.Group
              options={options}
              onChange={onChange1}
              value={checkBoxValue}
              className="h-fit"
              disabled={isupdate}
            />
          </span>
          <span className="lg:mx-2">
            <p className="text-xs font-normal mb-4 capitalize text-gray-700">
              Address
            </p>
            <TextArea
              className=""
              disabled={isupdate}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </span>
          <span className="lg:mx-2">
            <p className="text-xs font-normal mb-4 capitalize text-gray-700">
              Designation
            </p>
            <CustomDropdown
              type="select"
              className="w-full"
              value={designation}
              disabled={isupdate}
              menus={designationLists}
              onChange={(e) => setDesignation(e)}
            />
          </span>
          <span className="mx-2">
            <p className="text-xs font-normal mb-4 capitalize text-gray-700">
              Expertise
            </p>
            <CustomDropdown
              type="select"
              className="w-full"
              value={expertise}
              disabled={isupdate}
              menus={expertiseLists}
              onChange={(e) => setExpertise(e)}
            />
          </span>
        </form>
      ) : (
        <CustomSkeleton active rows={4} />
      )}
      {!isupdate && (
        <CustomButton
          title={"submit"}
          onClick={handleButtonClick}
          className={`absolute bottom-6 right-6 text-xs ${
            !isupdate && "bg-Primary"
          } capitalize tracking-wider`}
          color="solid"
          loading={isLoading}
        />
      )}
    </div>
  );
};

export default InstructorProfile;
