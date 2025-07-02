import { AlertCircleIcon } from "lucide-react";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  prefix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      error,
      prefix,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <label
          className="text-xs text-gray-500 uppercase tracking-wide"
          htmlFor={label}
        >
          {label}
        </label>
        <div
          className={`flex items-center w-full px-3 h-12 border rounded-lg
            ${className}
        ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
        }`}
        >
          {prefix && <div className="text-gray-400">{prefix}</div>}
          <input
            ref={ref}
            className="w-full border-none focus:outline-none transition-colors"
            id={label}
            placeholder={placeholder}
            {...props}
          />
        </div>
        {error && (
          <span className="flex items-center gap-2 text-sm text-red-400">
            <AlertCircleIcon size={16} />
            {error}
          </span>
        )}
      </div>
    );
  }
);
