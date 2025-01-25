import React, { useEffect } from "react";

const Aboutus = () => {
    useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          About Our E-Learning Platform
        </h2>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
          Our mission is to make learning accessible, engaging, and convenient
          for everyone. With a wide range of courses taught by expert
          instructors, flexible subscriptions, and an intuitive user experience,
          we aim to empower learners around the world.
        </p>
      </div>

      <div className="mt-10 max-w-4xl mx-auto grid gap-8 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800">
            Wide Course Selection
          </h3>
          <p className="mt-2 text-gray-600">
            Choose from a variety of courses across different fields, tailored
            to fit the needs of beginners, professionals, and everyone in
            between.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800">
            Flexible Subscriptions
          </h3>
          <p className="mt-2 text-gray-600">
            Access courses with various subscription options or one-time
            purchases for lifelong learning. Learn at your own pace and on your
            own terms.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800">
            Expert Instructors
          </h3>
          <p className="mt-2 text-gray-600">
            Learn from industry experts and experienced educators. Each
            instructor is selected based on their expertise and teaching
            experience.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-gray-900">
          Join Us and Start Your Learning Journey!
        </h3>
        <p className="mt-4 text-gray-600">
          Whether you're looking to upskill for your career or learn something
          new, our platform provides all the resources you need to succeed.
        </p>
      </div>
    </div>
  );
};

export default Aboutus;
