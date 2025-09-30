import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`border-2 border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-colors ${className}`}
    />
  );
}
