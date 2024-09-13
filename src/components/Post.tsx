import React, { useState } from 'react';
import PostContent from './PostContent';
import MessageIcons from '../icons/MessageIcons';
import ShareIcons from '../icons/Shareicons';
import Send from '../icons/Send';
import { PostData } from '../interfaces/post';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Reactions from '@/icons/Reactions';

interface PostProps {
  post: PostData;
  flag: boolean;
}

const Post: React.FC<PostProps> = ({ post, flag }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  const truncateContent = (content: string, wordLimit: number = 20): string => {
    const words = content.split(' ');
    if (words.length <= wordLimit) return content;
    return `${words.slice(0, wordLimit).join(' ')}...`;
  };

  const shouldShowReadMore = post.text.split(' ').length > 20;

  const handleToggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  const defaultCreatorName = 'LinkedIn User';

  return (
    <div style={{ border: '1px solid var(--Borders-primary-light-3, #A6A6B3)' }} className="cursor-pointer w-full bg-white my-2 mx-8 rounded-lg">
      <div className="flex items-start space-x-4 p-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={post.creator_profile_image} alt="Profile Picture" />
          <AvatarFallback>VM</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[16px] font-semibold textonprimary">{post.creator_name || defaultCreatorName}</h2>
              <p className="text-[12px] text-muted-foreground">
                {post.username || 'unknown'}
              </p>
              <p className="text-[12px] text-muted-foreground">
                {flag === false ? formatDate(post.post_created_at) : post.post_created_at}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-2 text-[#2A2930] leading-[19.6px] p-4">
        <PostContent content={isExpanded ? post.text : truncateContent(post.text, 20)} />
        {shouldShowReadMore && (
          <button onClick={handleToggleContent} className="text-[14px] mt-2 px-4 ml-[80%]">
            {isExpanded ? '..less' : '..more'}
          </button>
        )}
      </div>

    
      {post.post_images.length > 0 && (
        <div className="w-[400px] h-auto p-4">
          {post.post_images.length === 1 && (
            <div className="w-full h-auto">
              <img src={post.post_images[0]} alt="Post image 1" className="w-full h-auto rounded-md" />
            </div>
          )}

          {post.post_images.length === 2 && (
            <div className="w-full grid grid-cols-2 ">
              {post.post_images.map((image, index) => (
                <img key={index} src={image} alt={`Post image ${index + 1}`} className="w-full h-auto rounded-md" />
              ))}
            </div>
          )}

          {post.post_images.length === 3 && (
            <div className="w-full grid grid-cols-2">
              <div className="col-span-2">
                <img src={post.post_images[0]} alt="Post image 1" className="w-full h-auto rounded-md" />
              </div>
              {post.post_images.slice(1).map((image, index) => (
                <img key={index} src={image} alt={`Post image ${index + 2}`} className="w-full h-auto rounded-md" />
              ))}
            </div>
          )}

          {post.post_images.length === 4 && (
            <div className="w-full grid grid-cols-3">
              <div className="col-span-3">
                <img src={post.post_images[0]} alt="Post image 1" className="w-full h-auto rounded-md" />
              </div>
              {post.post_images.slice(1).map((image, index) => (
                <img key={index} src={image} alt={`Post image ${index + 2}`} className="w-full h-auto rounded-md" />
              ))}
            </div>
          )}

          {post.post_images.length > 4 && (
            <div className="w-full grid grid-cols-2 relative">
              <div className="col-span-2">
                <img src={post.post_images[0]} alt="Post image 1" className="w-full h-auto rounded-md" />
              </div>
              {post.post_images.slice(1, 4).map((image, index) => (
                <img key={index} src={image} alt={`Post image ${index + 2}`} className="w-full h-auto rounded-md" />
              ))}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-md">
                <span className="text-white text-lg font-bold">
                  +{post.post_images.length - 4}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center text-black bg-[#F1F0F9] h-[55px] rounded-bl-lg rounded-br-lg">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2 text-[#474751] text-[16px]">
            <div className="flex items-center justify-center w-24 h-24 pl-4">
              <Reactions/>
            </div>
            <span>
              {flag === false ? post.total_engagement : post.num_of_likes}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-2 text-[16px] text-[#474751]">
              <span>{post.num_of_comments}</span>
              <div className="flex items-center justify-center w-12 h-12">
                <MessageIcons />
              </div>
            </div>
            <div className="flex items-center gap-2 text-[12px]">
              <div className="flex items-center justify-center w-12 h-12">
                <ShareIcons />
              </div>
              <div className="flex items-center justify-center w-12 h-12">
                <Send />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
