import React, { useState, useEffect } from 'react';
import '../App.css';
import Dropdown from '../components/DropDown';
import Search from '../components/Search';
import PostTab from '../components/PostTab';
import { options2 } from '../lib/data';
import Navbar from '../components/Navbar';
import { PostData } from '../interfaces/post';
import User from '@/components/User';




const Home: React.FC = () => {
  const [totalPosts, setTotalPosts] = useState<PostData[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');
  const [filterOption, setFilterOption] = useState<string[]>([]);
 

  
  const handleFilterOptionClick = (option: string) => {
    setFilterOption(prev =>
      prev.includes(option) ? prev.filter(opt => opt !== option) : [...prev, option]
    );
  };
   

  


  useEffect(() => {
    let filteredPosts = [...totalPosts];

    // Apply search filter
    if (searchQuery) {
      filteredPosts = filteredPosts.filter(post =>
        post.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }


    // Apply sort filter
    switch (sortOption) {
      case 'Likes':
        filteredPosts.sort((a, b) => b.num_of_likes - a.num_of_likes);
        break;
      case 'Comments':
        filteredPosts.sort((a, b) => b.num_of_comments - a.num_of_comments);
        break;
      case 'Newest':
        filteredPosts.sort((a, b) => new Date(b.post_created_at).getTime() - new Date(a.post_created_at).getTime());
        break;
      case 'Oldest':
        filteredPosts.sort((a, b) => new Date(a.post_created_at).getTime() - new Date(b.post_created_at).getTime());
        break;
      case 'Reposts':
        filteredPosts.sort((a, b) => b.total_shares - a.total_shares);
        break;
      default:
        break;
    }

    setPosts(filteredPosts);
  }, [searchQuery, sortOption, filterOption, totalPosts]);

  return (
      <div className='content flex flex-col gap-4'>
        <Navbar />
        <div className='w-full flex items-center justify-center px-4 py-2 gap-2'>
          <h3 className='font-bold leading-[34.8px] text-[#2A2930]'>Trending</h3>
          <h3 className='leading-[34.8px] text-[#A6A6B3]'>Recent</h3>
          <h3 className='leading-[34.8px] text-[#A6A6B3]'>MyList</h3>
        </div>
        <User/>
        <div className='flex px-8 justify-between'>
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Dropdown dropdown="Sort" options={options2} selectedOption={sortOption} setSelectedOption={setSortOption} />
        </div>
        <div className='w-full flex items-center justify-center gap-4  px-4 text-[16px] leading-[22.4px] cursor-pointer'>
          <div
            onClick={() => handleFilterOptionClick('posts')}
            className={`px-8 py-3 ${filterOption.includes('posts') ? 'bg-[#F1F0F9] text-[#4C41E1] rounded-[50px]' : 'text-[#474751] hover:text-[#4C41E1]'}`}
          >
            <span>Posts</span>
          </div>
          <div
            onClick={() => handleFilterOptionClick('Text')}
            className={`px-8 py-3 ${filterOption.includes('Text') ? 'bg-[#F1F0F9] text-[#4C41E1] rounded-[50px]' : 'text-[#474751] hover:text-[#4C41E1]'}`}
          >
            <span>Text</span>
          </div>
          <div
            onClick={() => handleFilterOptionClick('Images')}
            className={`px-8 py-3 ${filterOption.includes('Images') ? 'bg-[#F1F0F9] text-[#4C41E1] rounded-[50px]' : 'text-[#474751] hover:text-[#4C41E1]'}`}
          >
            <span>Images</span>
          </div>
        </div>

        <PostTab posts={posts} setPosts={setPosts} setTotalPosts={setTotalPosts} typeOption="popular-posts" />
      </div>
  );
};

export default Home;
