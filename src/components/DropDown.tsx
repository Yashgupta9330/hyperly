import React, { useState } from 'react';
import ArrowIcons from '../icons/ArrowIcons';

interface DropdownProps {
  dropdown: string;
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ dropdown, options, selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const displaySelectedOption = (): string => {
    return selectedOption || 'Select';
  };

  const isSelected = (option: string): boolean => {
    return selectedOption === option;
  };

  const isAnySelected = (): boolean => {
    return !!selectedOption;
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`dropdown-toggle flex border gap-4 h-[50px] border-1 rounded-[4px] px-4 py-4 items-center justify-center bg-white ${
          isAnySelected() ? 'bg-gray-200' : 'border-[#F5F5F9]'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-[#A6A6B3]">
          {dropdown} {displaySelectedOption()}
        </span>
        <ArrowIcons />
      </button>
      {isOpen && (
        <ul
          className="dropdown-menu absolute mt-2 bg-white border border-gray-300 rounded shadow-lg z-10"
          role="listbox"
        >
          {options.map((option, index) => (
            <li
              key={index}
              className={`dropdown-item px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                isSelected(option) ? 'bg-black text-white' : ''
              }`}
              role="option"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
