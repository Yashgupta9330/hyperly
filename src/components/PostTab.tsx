import React, { useEffect, useState } from 'react';
import Post from './Post';
import { PostData } from '../interfaces/post';



// Define the types for the props
interface PostTabProps {
  posts: PostData[];
  setPosts: React.Dispatch<React.SetStateAction<PostData[]>>;
  setTotalPosts: React.Dispatch<React.SetStateAction<PostData[]>>;
  typeOption: string;
}

const PostTab: React.FC<PostTabProps> = ({ posts, setPosts, setTotalPosts, typeOption }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const response = await fetch('https://api.hyperly.ai/viral/inspirations', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiM2JmOTY2ZDk3NDhmNGUxODlmNzBjYTIyNWM0MTUyYzUiLCJleHBpcmVzIjoxNzI3MjcyNTM0LjU0NzAwNTd9.nDtqjbMPoN8A7ogd79aPqRA_8UabeTw70Sygmku6BQE'
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
