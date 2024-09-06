import React, { useEffect, useState } from 'react';
import Post from './Post';
import { PostData } from '../interfaces/post';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';



// Define the types for the props
interface PostTabProps {
  posts: PostData[];
  setPosts: React.Dispatch<React.SetStateAction<PostData[]>>;
  setTotalPosts: React.Dispatch<React.SetStateAction<PostData[]>>;
  typeOption: string;
}

const PostTab: React.FC<PostTabProps> = ({ posts, setPosts, setTotalPosts, typeOption }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const token = useSelector((state: RootState) => state.token);
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const response = await fetch('https://api.hyperly.ai/viral/inspirations', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token.token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
        setTotalPosts(data);
        console.log('Fetched Posts:', data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [typeOption, setPosts, setTotalPosts]);

  return (
    <div className='w-full flex flex-col items-center px-4 py-2 overflow-x-hidden'>
      {loading ? (
        <div className="shimmer-wrapper">
          <div className="shimmer"></div>
          <div className="shimmer"></div>
          <div className="shimmer"></div>
        </div>
      ) : (
        posts.map((post, index) => (
          <Post post={post} key={index} />
        ))
      )}
    </div>
  );
};

export default PostTab;
