import React from "react";

const LoadingPage = () => {
  return (
    <div className="h-[80vh] flex gap-4 justify-center items-center">
      <div className="h-5 w-5 bg-Primary/60 animate-pulse rotate-180 rounded-full" />
      <div className="h-5 w-5 bg-Primary/30 animate-pulse rotate-180 rounded-full" />
      <div className="h-5 w-5 bg-Primary/10 animate-pulse rotate-180 rounded-full" />
    </div>
  );
};

export default LoadingPage;
