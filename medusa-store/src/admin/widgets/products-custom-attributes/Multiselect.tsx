import { useState, useRef, useEffect } from "react";

type Option = {
  value: string;
  label: string;
};

type MultiselectProps = {
  options: Option[];
  value: string[];
  onChange: (values: string[]) => void;
};

export const Multiselect = ({ options, onChange, value }: MultiselectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOption = (option: Option) => {
    if (value.includes(option.value)) {
      onChange(value.filter((item) => item !== option.value));
    } else {
      onChange([...value, option.value]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-300 rounded px-4 py-2 cursor-pointer bg-white flex items-center justify-between"
      >
        <div className="flex flex-wrap gap-2">
          {value.length > 0 ? (
            value.map((option) => (
              <span
                key={option}
                className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm"
              >
                {options.find((op) => op.value === option)?.label || ""}
              </span>
            ))
          ) : (
            <span className="text-gray-400">Select options</span>
          )}
        </div>
        <svg
          className={`w-5 h-5 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center ${
                value.includes(option.value) ? "bg-gray-100" : ""
              }`}
              onClick={() => toggleOption(option)}
            >
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={() => toggleOption(option)}
                className="mr-2"
              />
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
