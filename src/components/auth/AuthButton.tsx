import React from "react";

interface AuthButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export const AuthButton = ({
  text,
  type = "button",
  onClick,
}: AuthButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full py-3 bg-primary-medium text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
    >
      {text}
    </button>
  );
}; 