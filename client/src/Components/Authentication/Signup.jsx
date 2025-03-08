import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../Common/CustomInput";
import { useCustomMessage } from "../Common/CustomMessage";
import CustomButton from "../Common/CustomButton";
import signUpImg from "../../Assets/Images/signup.png";
import { POST } from "../ApiFunction/ApiFunction";
import CustomDropdown from "../Common/CustomDropdown";
import axios from "axios";
import { action } from "../Url/url";

function Signup() {
  const showMessage = useCustomMessage();
  const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: "",
    number: "",
    email: "",
    designation: "",
    password: "",
    cnfpassword: "",
  });
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
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !registerData.username ||
      !registerData.number ||
      !registerData.email ||
      !registerData.designation ||
      !registerData.password ||
      !registerData.cnfpassword
    ) {
      return showMessage("warning", "please enter all the fields");
    }
    if (registerData.password !== registerData.cnfpassword) {
      alert("password do not match");
      return;
    }
    if (registerData.number.length < 10) {
      return showMessage("warning", "please enter 10 digit number");
    }
    setLoading(true);
    try {
      var result = await axios.post(`${action.REGISTER}`, registerData);
      if (result.status === 200) {
        showMessage("success", result.data.message);
        setLoading(false);
        navigate("/login");
      } else {
        showMessage("error", result.data.message);
        setLoading(false) 
      }
    } catch (e) {
      showMessage("error",e.message);
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-end h-screen relative w-full">
      <img
        src={signUpImg}
        alt={signUpImg}
        className="object-cover fixed bg-gradient-to-r from-gray-200 to-white h-full md:w-1/2 top-0 left-0"
      />
      <form className="flex flex-col gap-10 z-40 bg-[#ffffffe3] md:w-1/2 overflow-y-auto h-full w-full">
        <h1 className="text-center font-extrabold tracking-wider md:text-3xl text-xl sticky top-0 bg-white z-10 py-4 pl-4">
          <span className="text-3xl md:text-[50px] text-Primary">s</span>ign up
        </h1>
        <CustomInput
          className="p-2"
          containerClassName="mx-4"
          title="Name"
          required={true}
          type="text"
          placeholder="enter your name"
          onChange={(e) =>
            setRegisterData((p) => ({ ...p, username: e.target.value }))
          }
        />
        <CustomInput
          className="p-2"
          containerClassName="mx-4"
          title="Phone number"
          required={true}
          type="number"
          placeholder="enter your number"
          onChange={(e) =>
            setRegisterData((p) => ({ ...p, number: parseInt(e.target.value) }))
          }
        />
        <CustomInput
          className="p-2"
          containerClassName="mx-4"
          title="Email"
          required={true}
          type="email"
          placeholder="enter your mail"
          onChange={(e) =>
            setRegisterData((p) => ({ ...p, email: e.target.value }))
          }
        />
        <CustomInput
          className="p-2"
          containerClassName="mx-4"
          title="Create password"
          required={true}
          type="password"
          placeholder="enter your password"
          onChange={(e) =>
            setRegisterData((p) => ({ ...p, password: e.target.value }))
          }
        />
        <CustomInput
          className="p-2"
          containerClassName="mx-4"
          title="Confirm password"
          required={true}
          type="password"
          placeholder="Confirm password"
          onChange={(e) =>
            setRegisterData((p) => ({ ...p, cnfpassword: e.target.value }))
          }
        />
        <CustomDropdown
          type="select"
          containerClassName="mx-4"
          menus={designationLists}
          className="w-full h-10 pr-2 border border-gray-300 rounded "
          placeholder="select"
          variant="borderless"
          title="Designation"
          required={true}
          onChange={(value) =>
            setRegisterData((p) => ({ ...p, designation: value }))
          }
        />
        <div className="mx-4 mb-4">
          <CustomButton
            title="submit"
            color="solid"
            onClick={handleSubmit}
            loading={loading}
          />
          <Link to="/login">
            <CustomButton
              title="Back"
              className="mx-4 text-Primary tracking-wider"
              variant="link"
              color="solid"
            />
          </Link>
        </div>
      </form>
    </div>
  );
}
export default Signup;
