import Link from "next/link";
import React, { useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { IconType } from "react-icons/lib";

interface DropdownMenuProps {
  items: { href: string; label: string; itemIcons?: IconType }[];
  buttonName: string;
  btnIcon?: IconType;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  buttonName,
  btnIcon: BtnIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        type="button"
        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        onClick={toggleDropdown}
      >
        {BtnIcon && (
          <BtnIcon className="flex-shrink-0 w-5 h-5 text-orange-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
        )}
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          {buttonName}
        </span>
        {isOpen ? (
          <FaAngleUp className="w-4 h-4 ml-1 text-gray-500" />
        ) : (
          <FaAngleDown className="w-4 h-4 ml-1 text-gray-500" />
        )}
      </button>

      <ul className={`py-2 space-y-2 ${isOpen ? "" : "hidden"}`}>
        {items.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className="flex items-center gap-1.5 w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              {item.itemIcons && (
                <item.itemIcons className="flex-shrink-0 w-5 h-5 text-blue-600 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
              )}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DropdownMenu;
