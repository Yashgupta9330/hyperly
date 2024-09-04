import SearchIcons from '@/icons/Search';
import React, { ChangeEvent } from 'react';
import { Input } from "@/components/ui/input"


interface SearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchQuery, setSearchQuery }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  


  return (
    <div style={{ width: '267px', height: '40px' }}>
      <div style={{
        borderRadius: '4px',
        gap: '8px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        overflow: 'hidden',
        border: '1px solid #F5F5F9'
      }}>
        <div style={{ display: 'grid', placeItems: 'center', height: '40px', width: '48px', color: '#ccc' }}>
          <SearchIcons />
        </div>
         <Input
          className='h-[40px] text-[16px] border border-none rounded-md focus:outline-none hover:border-white focus:border-none'
          placeholder="Search posts.."
          value={searchQuery}
          onChange={handleChange}
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