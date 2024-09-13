import React, { ChangeEvent, InputHTMLAttributes, forwardRef } from 'react';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import SearchIcons from '@/icons/Search';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> { }

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={cn(
          "border-none",
          "hover:border-none",
          "focus:border-none",
          "focus:ring-0 focus:ring-offset-0",
          "focus:outline-none",
          className
        )}
        {...props}
      />
    );
  }
);
CustomInput.displayName = "CustomInput";

interface SearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchQuery, setSearchQuery }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="w-[250px] h-[40px]">
      <div
        style={{ border: '1px solid var(--Borders-primary-light-1, #F5F5F9)' }}
        className={cn(
          "flex items-center w-full overflow-hidden rounded-md bg-white",
          "gap-2"
        )}
      >
        <div className="grid h-[40px] w-[48px] place-items-center text-gray-400 cursor-pointer">
          <SearchIcons />
        </div>
        <CustomInput
          className="h-[40px] text-[16px]"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={handleChange}
          aria-label="Search posts"
        />
      </div>
    </div>
  );
};

export default Search;



{/*import { ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import SearchIcons from "@/icons/Search";


interface SearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchQuery, setSearchQuery }) => {

  const handleChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="w-[450px] p-4 bg-white">
      <div className="flex items-center justify-between space-x-2">
        <div className="relative flex-grow">
           <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4">
            <SearchIcons/>
            </div>
          <Input
            type="text"
            placeholder="Search posts"
            value={searchQuery}
            onChange={handleChange}
            className="pl-8 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  )
}

export default Search; */}