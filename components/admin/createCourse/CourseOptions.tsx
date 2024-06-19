"use client";

import React from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOptions = ({ active, setActive }: Props) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];

  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      {options.map((option, index) => (
        <li key={index} className="mb-10 ms-6">
          <span
            className={`absolute flex items-center justify-center w-6 h-6 ${
              active > index ? "bg-blue-100" : "bg-gray-300"
            } rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 ${
              active > index ? "dark:bg-blue-900" : "dark:bg-gray-800"
            }`}
          >
            {active > index ? (
              <IoMdCheckmark className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />
            ) : (
              <svg
                className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            )}
          </span>
          <h3
            className={`flex items-center mb-1 text-lg font-semibold ${
              active === index ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {option}
          </h3>
        </li>
      ))}
    </ol>
  );
};

export default CourseOptions;
