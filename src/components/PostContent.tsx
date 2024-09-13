import React from 'react';

interface PostContentProps {
  content: string; 
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  return (
    <div className='my-3 text-[#2A2930] w-full'>
      <p className='my-3 px-4 text-[16px]'>{content}</p>
    </div>
  );
};

export default PostContent;
