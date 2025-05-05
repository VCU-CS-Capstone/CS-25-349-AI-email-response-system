import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-24 relative">
      <div className="h-16 w-16 border-4 border-navy-fade border-t-navy-500 rounded-full animate-spin"></div>
      <img
        src="./assets/CaseFlowLogo.png"
        alt="Loading"
        className="absolute w-10 h-auto animate-pulse"
      />
    </div>
  );
};

export default LoadingSpinner;
