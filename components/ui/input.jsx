// components/ui/input.jsx
import React from "react";

export const Input = ({ placeholder, value, onChange, className = "", ...props }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
      {...props}
    />
  );
};
