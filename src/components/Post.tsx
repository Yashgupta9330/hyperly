import React, { useState } from 'react';
import PostContent from './PostContent';
import HeartIcons from '../icons/Hearticons';
import MessageIcons from '../icons/MessageIcons';
import ShareIcons from '../icons/Shareicons';
import Send from '../icons/Send';
import { PostData } from '../interfaces/post';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"


interface PostProps {
  post: PostData;
}

const Post: React.FC<PostProps> = ({ post }) => {
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

  const truncateContent = (content: string, wordLimit: number = 50): string => {
    const words = content.split(' ');
    if (words.length <= wordLimit) return content;
    return `${words.slice(0, wordLimit).join(' ')}...`;
  };

  const shouldShowReadMore = post.text.split(' ').length > 50;

  const handleToggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  const defaultCreatorName = 'LinkedIn User';

  return (
    <div style={{ border: '1px solid var(--Borders-primary-light-3, #A6A6B3)' }} className="cursor-pointer w-full bg-white my-2 mx-4 rounded-lg">
      {/*</div><div className="flex gap-2 p-4">
        <Profile src={post.creator_profile_image} />
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-[#2A2930]">{post.creator_name || defaultCreatorName}</h1>
            <span className="text-xs text-[#474751]">@{post.username || 'unknown'}</span>
            <p className="text-xs text-gray-500">{formatDate(post.post_created_at)}</p>
          </div>
        </div>
      </div> */}
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
                Building #1 LinkedIn Social Selling Platform | Hyperly.ai | Startup
              </p>
              <p className="text-[12px] text-muted-foreground">{formatDate(post.post_created_at)}</p>
        </div>
       </div>
       </div>
       </div>
      <div className="py-2 text-[#2A2930] leading-[19.6px] p-4">
        <PostContent content={isExpanded ? post.text : truncateContent(post.text, 50)} />
        {shouldShowReadMore && (
          <button onClick={handleToggleContent} className="text-[16px] mt-2 px-4 ml-[80%]">
            {isExpanded ? '..less' : '..more'}
          </button>
        )}
      </div>

      {/* Display post images if available */}
      {post.post_images.length > 0 && (
        <div className="p-4">
          {post.post_images.map((image, index) => (
            <img key={index} src={image} alt={`Post image ${index + 1}`} className="w-full h-auto rounded-md" />
          ))}
        </div>
      )}

      <div className="flex items-center text-black bg-[#F1F0F9] h-[55px] rounded-bl-lg rounded-br-lg">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2 text-[#474751] text-[16px]">
            <div className="flex items-center justify-center w-12 h-12">
              <HeartIcons />
            </div>
            <span>{post.total_engagement}</span>
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
