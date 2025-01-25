import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCustomMessage } from "../Common/CustomMessage";
import CustomInput from "../Common/CustomInput";
import CustomButton from "../Common/CustomButton";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const showMessage = useCustomMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return showMessage("warning","Passwords do not match");
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/resetpass/${token}`,
        { password })
      showMessage("success", response.data.message)
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
    } catch (err) {
      showMessage("error", err.response?.data?.message || "Something went wrong")
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col items-center justify-center">
      <form className="md:h-4/5 z-40 bg-white md:w-1/2 h-full flex items-center flex-col gap-10 w-full shadow rounded-lg p-8 relative overflow-hidden">
        <h2 className="text-2xl z-10 flex items-center gap-4 font-mono p-2 my-8 md:text-[40px] font-bold tracking-wider">
          Create New <span className="p-2 text-xs uppercase rounded text-white h-fit bg-Primary">Password</span>
        </h2>
        <CustomInput
          type="password"
          value={password}
          placeholder="Create password"
          titleClassName="lg:text-2xl"
          containerClassName=" w-4/5 lg:w-1/2 p-2"
          className="p-2"
          variant="filled"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <CustomInput
          type="password"
          value={confirmPassword}
          placeholder="Confirm password"
          titleClassName="lg:text-2xl"
          containerClassName=" w-4/5 lg:w-1/2 p-2"
          className="p-2"
          variant="filled"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <CustomButton
          title="Reset"
          type="submit"
          size="large"
          className=" shadow-md font-bold tracking-widest "
          color="danger"
          onClick={handleSubmit}
        />
        <small>Don't go back</small>
      </form>
    </div>
  );
};

export default ResetPassword;
