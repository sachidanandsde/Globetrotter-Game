import React from "react";

const Input = ({ type, placeholder, value, onChange, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    />
  );
};

export default Input;
