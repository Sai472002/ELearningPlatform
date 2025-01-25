import React from "react";

const Cancel = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-semibold text-red-600">Payment Canceled</h1>
      <p className="text-gray-700 mt-2">Your payment was not completed. Please try again.</p>
      <button
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => window.location.href = "/courses"}
      >
        Back to Courses
      </button>
    </div>
  );
};

export default Cancel;
