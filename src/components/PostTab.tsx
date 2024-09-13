import React, { useEffect, useState } from 'react';
import Post from './Post';
import { PostData } from '../interfaces/post';

interface PostTabProps {
  posts: PostData[];
  setPosts: React.Dispatch<React.SetStateAction<PostData[]>>;
  setTotalPosts: React.Dispatch<React.SetStateAction<PostData[]>>;
  typeOption: string;
  profileData: PostData[] | null;
}

const PostTab: React.FC<PostTabProps> = ({ posts, setPosts, setTotalPosts, typeOption, profileData }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem('token');
  const [flag,setFlag]=useState<boolean>(false);
  useEffect(() => {
    if (profileData && profileData.length > 0) {
      setPosts(profileData);
      setTotalPosts(profileData);
      setFlag(true);
      setLoading(false);
    } 
    else {
      async function fetchPosts() {
        setLoading(true);
        try {
          const response = await fetch('https://api.hyperly.ai/viral/inspirations', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
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
    }
  }, [profileData, token, typeOption, setPosts, setTotalPosts]);

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
          <Post post={post} key={index} flag={flag} />
        ))
      )}
    </div>
  );
};

export default PostTab;
