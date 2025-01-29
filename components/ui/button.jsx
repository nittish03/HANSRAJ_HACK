// components/ui/button.jsx
import React from "react";

export const Button = ({ children, onClick, className = "", ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-lg shadow-lg hover:opacity-90 transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
