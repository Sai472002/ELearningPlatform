import React from "react";
import Banner from "./Banner";
import Course from "./Course";
import Subscriptions from "./Subscriptions";
import Mentors from "./Mentors";
import Testimonial from "./Testimonials";
import Footer from "./Footer";
import { FloatButton } from "antd";
import { UpOutlined } from "@ant-design/icons";

const Home = () => {
  return (
    <>
      <Banner />
      <Course />
      <Subscriptions />
      <Mentors />
      <Testimonial />
      <Footer />
      <FloatButton.BackTop icon={<UpOutlined />} />
    </>
  );
};

export default Home;
