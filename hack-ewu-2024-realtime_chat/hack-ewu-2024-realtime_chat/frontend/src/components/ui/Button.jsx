import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({ className, children, ...rest }) => {
  return (
    <button className={twMerge("btn", className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
