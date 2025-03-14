import React from "react";

interface AuthButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

export const AuthButton = ({
  text,
  type = "button",
  onClick,
  disabled,
}: AuthButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-4 bg-gradient-to-r from-[#77AD3F] to-[#0F6435] text-white rounded-full font-medium transition-all 
      ${disabled ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md active:scale-[0.99]'}`}
    >
      {text}
    </button>
  );
}; 