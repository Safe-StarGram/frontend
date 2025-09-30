import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className: string;
  disabled: boolean;
  baseColor?: string;
  hoverColor?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  disabled,
  className,
  baseColor = "brand",
  hoverColor = "orange-300",
  onClick,
}: ButtonProps) {
  const getBaseColorClass = (color: string) => {
    switch (color) {
      case "black":
        return "bg-black";
      case "red":
        return "bg-red-500";
      default:
        return "bg-brand";
    }
  };
  const getHoverColorClass = (color: string) => {
    switch (color) {
      case "black":
        return "hover:bg-gray-700";
      case "red":
        return "hover:bg-red-400";
      default:
        return "hover:bg-orange-300";
    }
  };
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 text-white p-2 transition ${className} ${getBaseColorClass(
        baseColor
      )} ${
        disabled
          ? "opacity-30 cursor-not-allowed"
          : `hover:cursor-pointer ${getHoverColorClass(hoverColor)}`
      }`}
    >
      {children}
    </button>
  );
}
