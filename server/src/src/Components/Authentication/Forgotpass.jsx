import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../Common/CustomButton";
import CustomInput from "../Common/CustomInput";
import { useCustomMessage } from "../Common/CustomMessage";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const showMessage = useCustomMessage();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/forgotpassword",
        { email }
      );
      if (response.status === 200) {
        setLoading(false);
        showMessage("success", response?.data?.message);
        // navigate("/resetpass/:token");
      }
    } catch (err) {
      setLoading(false);
      showMessage(
        "error",
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col items-center justify-center">
      <form className="md:h-4/5 z-40 bg-white md:w-1/2 h-full flex items-center flex-col gap-10 w-full shadow rounded-lg p-4">
        <h2 className="text-2xl z-10 flex items-center gap-2 font-mono p-2 my-8 md:text-[40px] font-bold tracking-wider">
          Forgot{" "}
          <span className="text-lg px-2 py-1 bg-red-100 border-2 border-red-300 rounded-r-lg text-red-400 uppercase">
            Password
          </span>
        </h2>
        <div className="flex flex-col items-center justify-center h-1/2 w-full gap-8 relative">
          <CustomInput
            type="email"
            value={email}
            placeholder="Enter here"
            title="Enter your registered email address"
            containerClassName="lg:w-4/5 mx-auto"
            className="p-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomButton
            title="Submit"
            loading={loading}
            size="large"
            className=" float-end font-bold"
            color="solid"
            onClick={handleSubmit}
          >
            Submit
          </CustomButton>
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
};

export default ForgotPassword;
