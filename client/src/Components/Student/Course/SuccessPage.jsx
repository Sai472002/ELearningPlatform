import React from "react";

const Success = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-semibold text-green-600">
        Payment Successful!
      </h1>
      <h2 className="text-3xl font-semibold text-green-600">
        Check you mail for receipt
      </h2>
      <p className="text-gray-700 mt-2">Thank you for your purchase.</p>
      <button
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => (window.location.href = "/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default Success;
