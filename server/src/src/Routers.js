import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Student/Home/Home";
import Signup from "./Components/Authentication/Signup";
import Login from "./Components/Authentication/Login";
import ResetPassword from "./Components/Authentication/ResetPass";
import ForgotPassword from "./Components/Authentication/Forgotpass";
import VericicationPage from "./Components/Authentication/VericicationPage";
import ProfileDetails from "./Components/Student/Home/ProfileDetails";
import MainLayout from "./Components/Student/Home/MainLayout";
import DashBoard from "./Components/Instructor/Dashboard";
import InstructorProfile from "./Components/Instructor/InstructorProfile";
import InstructorCourse from "./Components/Instructor/Course/InstructorCourse";
import AddCourse from "./Components/Instructor/Course/AddCourse";
import EditCourse from "./Components/Instructor/Course/EditCourse";
import Course from "./Components/Student/Course/Course";
import MyCourse from "./Components/Student/Course/MyCourse";
import CourseContent from "./Components/Student/Course/CourseContent";
import Success from "./Components/Student/Course/SuccessPage";
import Cancel from "./Components/Student/Course/CancelPage";
import Aboutus from "./Components/Student/Home/Aboutus";
import Contact from "./Components/Student/Home/Contact";
import AdminProfile from "./Components/Admin/AdminProfile";
import AdminCourse from "./Components/Admin/Course/AdminCourse";
import AdminInstructor from "./Components/Admin/Instructor/AdminInstructor";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminStudent from "./Components/Admin/Student/AdminStudent";

const Routers = () => {
  return (
    <main className="font-Poppins">
      <Routes>
        {/* Main layout with nested routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} /> {/* Default route for / */}
          <Route path="/courses" element={<Course />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<Aboutus />} />
          <Route
            path="/courses/coursedetails/:_id"
            element={<CourseContent />}
          />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/mycourse" element={<MyCourse />} />
          <Route path="/profiledetails" element={<ProfileDetails />} />
        </Route>

        {/* Authentication routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="/resetpass/:token" element={<ResetPassword />} />
        <Route path="/verify" element={<VericicationPage />} />

        {/* Instructor Dashboard */}
        <Route path="/instructordashboard" element={<DashBoard />}>
          {/* <Route index element={<InstructorTable/>} /> */}
          <Route path="/instructordashboard" element={<InstructorProfile />} />
          <Route
            path="/instructordashboard/instructorcourse"
            element={<InstructorCourse />}
          />
          <Route
            path="/instructordashboard/instructorcourse/addCourse"
            element={<AddCourse />}
          />
          <Route
            path="/instructordashboard/instructorcourse/editCourse"
            element={<EditCourse />}
          />
        </Route>
        <Route path="/adminpanel" element={<AdminDashboard />}>
          <Route path="/adminpanel" element={<AdminProfile />} />
          <Route path="/adminpanel/course" element={<AdminCourse />} />
          <Route path="/adminpanel/course/addCourse" element={<AddCourse />} />
          <Route path="/adminpanel/instructor" element={<AdminInstructor />} />
          <Route path="/adminpanel/student" element={<AdminStudent />} />
          <Route
            path="/adminpanel/course/editCourse"
            element={<EditCourse />}
          />
        </Route>
      </Routes>
    </main>
  );
};

export default Routers;
