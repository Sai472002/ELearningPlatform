import React, { useEffect, useState } from "react";
import loginImg from "../../Assets/Images/login.png";
import CustomInput from "../Common/CustomInput";
import CustomButton from "../Common/CustomButton";
import loginLeftImage from "../../Assets/Images/loginbg.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCustomMessage } from "../Common/CustomMessage";
import { POST } from "../ApiFunction/ApiFunction";
import { action } from "../Url/url";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const showMessage = useCustomMessage();

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showMessage("error", "Please fill in all fields");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showMessage("error", "Please enter a valid email");
      return;
    }
    const url = process.env.REACT_APP_BACKEND_URL;

    setLoading(true);
    try {
      const result = await POST(`${action.LOGIN}`, {
        email,
        password,
      });
      setLoading(false);
      if (result?.status === 200) {
        sessionStorage.setItem("token", result?.data?.token);
        sessionStorage.setItem("id", result?.data?.userId);
        sessionStorage.setItem("designation", result?.data?.designation);
        // showMessage("success", result?.data?.message);
        navigate(result?.data?.navigate);
      } else {
        showMessage("error", "Invalid email id or password");
      }
    } catch (error) {
      setLoading(false);
      showMessage("error", "Invalid email id or password");
    }
  };

  return (
    <div className="font-Poppins flex h-screen tracking-wider">
      <div className="h-full w-1/2 md:w-2/5 lg:w-1/2 bg-gray-400 hidden md:block">
        <img
          src={loginLeftImage}
          alt="Login Background"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="text-3xl font-bold w-full md:w-4/5 lg:w-1/2 h-[100vh] flex items-center gap-4 justify-center relative">
        <img
          src={loginImg}
          alt="Login"
          className="absolute object-cover h-full rotate-180 w-full top-0"
        />
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className=" md:h-[80vh] bg-gradient-to-b from-transparent to-white p-4 w-full md:w-4/5 flex flex-col gap-10 z-40 md:p-10"
        >
          <h1 className="lg:text-[60px] h-1/5 text-[40px] md:text-left p-4 md:p-0 flex items-center gap-4 justify-center w-full text-center">
            Login{" "}
            <Link
              to="/"
              className="text-xs p-2 bg-Primary rounded rounded-r-full text-white"
            >
              Go to home
            </Link>
          </h1>
          <CustomInput
            className="w-4/5 md:w-11/12 lg:w-4/5 mx-auto p-2"
            variant="filled"
            type="text"
            value={email}
            title="Email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            aria-label="Email"
            autoComplete="nope"
          />
          <CustomInput
            className="w-4/5 md:w-11/12 lg:w-4/5 mx-auto p-2"
            variant="filled"
            type="password"
            value={password}
            title="Password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            aria-label="Password"
            autoComplete="nope"
          />
          <div className="flex">
            <Link to="/forgotpass">
              <CustomButton
                title="Forgot Password"
                className="py-1 text-xs "
                color="danger"
                variant="link"
                size="small"
              />
            </Link>
          </div>
          <div className="mt-4 flex items-center">
            <CustomButton
              title={"Login"}
              className="py-1 w-40"
              color="primary"
              size="large"
              onClick={handleSubmit}
              loading={loading}
            />
            <Link to="/signup">
              <CustomButton
                title="Create an account"
                className="py-1 ml-4 text-xs text-Primary"
                variant="text"
                size="large"
              />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
