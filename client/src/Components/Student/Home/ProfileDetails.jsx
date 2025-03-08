import React, { useEffect, useMemo, useState } from "react";
import CustomInput from "../../Common/CustomInput";
import { GET, PUT } from "../../ApiFunction/ApiFunction";
import CustomButton from "../../Common/CustomButton";
import { Avatar, Checkbox, Radio, Switch } from "antd";
import { useCustomMessage } from "../../Common/CustomMessage";
import TextArea from "antd/es/input/TextArea";
import CustomProgressBar from "../../Common/CustomProgressBar";
import CustomSkeleton from "../../Common/CustomSkeleton";
import axios from "axios";
import CustomDropdown from "../../Common/CustomDropdown";
import { EditFilled, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import CustomAvatar from "../../Common/CustomAvatar";

const ProfileDetails = () => {
  const showMessage = useCustomMessage();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(true);
  const [isupdate, setIsupdate] = useState(true);
  const [checkBoxValue, setCheckBoxValue] = useState("male");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");
  const [pieData, setPieData] = useState([]);

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
      value: "Admin",
      label: "Admin",
    },
    {
      value: "Student",
      label: "Student",
    },
    {
      value: "Instructor",
      label: "Instructor",
    },
  ];

  const onChange1 = ({ target: { value } }) => {
    console.log("radio1 checked", value);
    setCheckBoxValue(value);
  };

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getdata`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(result.data);
        const filteredData = result.data.map((user) => ({
          username: user.username ? 10 : 0,
          fullname: user.fullname ? 10 : 0,
          phonenumber: user.phonenumber ? 10 : 0,
          age: user.age ? 10 : 0,
          gender: user.gender ? 10 : 0,
          email: user.email ? 10 : 0,
          address: user.address ? 10 : 0,
        }));
        const count =
          filteredData[0].username +
          filteredData[0].fullname +
          filteredData[0].phonenumber +
          filteredData[0].age +
          filteredData[0].gender +
          filteredData[0].email +
          filteredData[0].address +
          30;
        setPieData(count);
        if (result.data?.length > 0 && result.data[0].gender) {
          setCheckBoxValue(result.data[0].gender);
          setAddress(result.data[0].address);
          setDesignation(result.data[0].designation);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(pieData);

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
    try {
      const result = await PUT(
        `${process.env.REACT_APP_BACKEND_URL}/editdata`,
        convertedObject
      );
      if (result.status === 200) {
        setIsLoading(false);
        showMessage("success", "Data added Successfully");
        fetchData();
      }
    } catch (error) {
      showMessage("error", "Something went wrong");
      setIsLoading(false);
    }
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
    const phonePattern = /^\d{10}$/; // Ensures the phone number is exactly 10 digits
    const agePattern = /^\d{2}$/; // Ensures the age is exactly 2 digits

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
      setChecked(true);
    }
  };

  return (
    <form className=" lg:mx-auto grid gap-2 p-4 lg:p-6">
      <h1 className="lg:text-2xl text-base font-light text-gray-500 tracking-wide mb-4">
        Details
      </h1>
      <div className="shadow grid gap-4 rounded-lg p-4 min-h-24 bg-white">
        <div className="flex items-center gap-4">
          <CustomAvatar
            name={data[0]?.username}
            imagepath={data[0]?.imagepath}
            refresh={fetchData}
          />
          <p className="grid">
            {data[0]?.username}
            <small className="text-xs text-gray-400">
              {data[0]?.designation || "Student"}
            </small>
          </p>
        </div>
        <div className="flex flex-wrap gap-2 lg:block">
          <small className="bg-gray-100 rounded-lg p-1 px-2 text-xs w-fit">
            <MailOutlined className="mr-2" />
            {data[0]?.email}
          </small>
          <small className="bg-gray-100 rounded-lg p-1 px-2 text-xs sm:ml-4 w-fit">
            <PhoneOutlined className="mr-2" />
            {data[0]?.phonenumber}
          </small>
        </div>
        <CustomProgressBar percent={pieData || 20} defaultColor active />
      </div>
      <div className=" flex items-center justify-between transition-all ">
        <span className="flex items-center">
          <span className="lg:text-2xl text-base font-light text-gray-500 tracking-wide">
            Edit
          </span>
          <EditFilled
            onClick={() => setIsupdate(!isupdate)}
            className="shadow duration-500 scale-100 bg-white hover:bg-Primary/10 hover:text-Primary p-2 rounded-full"
          />
        </span>
      </div>
      {data.length > 0 ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2
          lg:grid-cols-4 gap-4 items-center rounded-lg p-8 bg-white"
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

          <span className="mx-2">
            <p className="text-xs font-normal mb-4 text-gray-700">gender</p>
            <Radio.Group
              options={options}
              onChange={onChange1}
              value={checkBoxValue}
              className="h-fit"
              disabled={isupdate}
            />
          </span>
          <span className="mx-2">
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
          <span className="mx-2">
            <p className="text-xs font-normal mb-4 capitalize text-gray-700">
              Designation
            </p>
            <CustomDropdown
              type="select"
              className="w-full"
              value={designation || "Student"}
              defaultValue={1}
              disabled={true}
              menus={designationLists}
              onChange={(e) => {
                setDesignation(e.target.value);
              }}
            />
          </span>
        </div>
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
    </form>
  );
};

export default ProfileDetails;
