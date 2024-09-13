import React, { useState, useEffect } from 'react';
import '../App.css';
import Dropdown from '../components/DropDown';
import Search from '../components/Search';
import PostTab from '../components/PostTab';
import { options2 } from '../lib/data';
import Navbar from '../components/Navbar';
import { PostData } from '../interfaces/post';
import User from '@/components/User';
import { fetchLinkedInProfileUpdates } from '@/services/post';

const Home: React.FC = () => {
  const [totalPosts, setTotalPosts] = useState<PostData[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');
  const [filterOption, setFilterOption] = useState<string[]>([]);
  const [profileData, setProfileData] = useState<PostData[] | null>(null);
  const [storedProfileData, setStoredProfileData] = useState<PostData | null>(null);
  const [totalLikes, setTotalLikes] = useState<number>(0);

  const handleFilterOptionClick = (option: string) => {
    setFilterOption(prev =>
      prev.includes(option) ? prev.filter(opt => opt !== option) : [...prev, option]
    );
  };

  useEffect(() => {
    const handleProfileUpdate = (message: any) => {
      if (message.action === 'profileUpdates') {
        console.log('Received miniProfileUrn:', message.miniProfileUrn);
        checkInUserProfile(message.miniProfileUrn);
      }
    };

    chrome.runtime.onMessage.addListener(handleProfileUpdate);
    return () => {
      chrome.runtime.onMessage.removeListener(handleProfileUpdate);
    };
  }, []);

  const checkInUserProfile = async (miniProfileUrn: string) => {
    try {
      const data = await fetchLinkedInProfileUpdates(miniProfileUrn);
      const extractedProfileData: PostData[] = data.elements.map((element: any) => {
        const images = element.content?.['com.linkedin.voyager.feed.render.ImageComponent']?.images?.map((img: any) => {
          const vectorImage = img.attributes[0]?.vectorImage;
          if (vectorImage) {
            const imageArtifact = vectorImage.artifacts.reduce((maxArtifact: any, artifact: any) => {
              return artifact.width > (maxArtifact?.width || 0) ? artifact : maxArtifact;
            }, { width: 0 });

            return imageArtifact ? vectorImage.rootUrl + imageArtifact.fileIdentifyingUrlPathSegment : null;
          }
          return null;
        }).filter((url: string | null) => url !== null) || [];

        const celebrationImageUrl = element.content?.['com.linkedin.voyager.feed.render.CelebrationComponent']?.image?.attributes[0]?.imageUrl || null;

        const celebrationVectorImage = element.content?.['com.linkedin.voyager.feed.render.CelebrationComponent']?.image?.attributes[0]?.vectorImage;
        const celebrationVectorArtifact = celebrationVectorImage?.artifacts.find((artifact: any) => artifact.width <= 512);
        const celebrationVectorImageUrl = celebrationVectorArtifact
          ? celebrationVectorImage.rootUrl + celebrationVectorArtifact.fileIdentifyingUrlPathSegment
          : null;

        const profileImageArtifact = element.actor?.image?.attributes[0]?.miniProfile?.picture?.['com.linkedin.common.VectorImage']
          ?.artifacts[0];
        const profileImageUrl = profileImageArtifact ? element.actor?.image?.attributes[0]?.miniProfile?.picture?.['com.linkedin.common.VectorImage']
          ?.rootUrl + profileImageArtifact.fileIdentifyingUrlPathSegment : null;

        return {
          creator_name: element.actor?.name?.text || 'N/A',
          post_created_at: element.actor?.subDescription?.accessibilityText || 'N/A',
          username: element.actor?.description?.accessibilityText || 'N/A',
          text: element.commentary?.text?.text || 'N/A',
          total_shares: element.socialDetail?.totalShares || 0,
          num_of_comments: element.socialDetail?.comments?.paging?.total || 0,
          num_of_likes: element.socialDetail?.likes?.paging?.total || 0,
          linkedin_id: element.socialContent?.shareUrl || 'N/A',
          post_images: [...images, celebrationImageUrl, celebrationVectorImageUrl].filter((url: string | null) => url !== null),
          creator_profile_image: profileImageUrl
        };
      });

      // Profile data
      const headerImageArtifact = data.elements[0].header?.image?.attributes[0]?.miniProfile?.picture?.['com.linkedin.common.VectorImage']?.artifacts[0];
      const headerImageUrl = headerImageArtifact
        ? data.elements[0].header?.image?.attributes[0]?.miniProfile?.picture?.['com.linkedin.common.VectorImage']?.rootUrl + headerImageArtifact.fileIdentifyingUrlPathSegment
        : null;

      const actorImageArtifact = data.elements[0].actor?.image?.attributes[0]?.miniProfile?.picture?.['com.linkedin.common.VectorImage']?.artifacts[0];
      const actorImageUrl = actorImageArtifact
        ? data.elements[0].actor?.image?.attributes[0]?.miniProfile?.picture?.['com.linkedin.common.VectorImage']?.rootUrl + actorImageArtifact.fileIdentifyingUrlPathSegment
        : null;

      const actorImageArtifacts = data.elements[0].actor?.image?.attributes[1]?.miniProfile?.picture?.['com.linkedin.common.VectorImage']?.artifacts[0];
      const actorImageUrls = actorImageArtifacts
        ? data.elements[0].actor?.image?.attributes[1]?.miniProfile?.picture?.['com.linkedin.common.VectorImage']?.rootUrl + actorImageArtifacts.fileIdentifyingUrlPathSegment
        : null;

      const profileNames = data.elements[0].actor?.image?.attributes[1]?.miniProfile?.firstName + data.elements[0].actor?.image?.attributes[1]?.miniProfile?.lastName;
      const profileName = data.elements[0].header?.image?.attributes[0]?.miniProfile?.firstName + data.elements[0].header?.image?.attributes[0]?.miniProfile?.lastName;
      const actorName = data.elements[0].actor?.name?.text;

      const profile = {
        image: headerImageUrl || actorImageUrl || actorImageUrls,
        name: profileName || profileNames || actorName,
        text: data.elements[0].actor?.subDescription?.accessibilityText || 'N/A'
      };

      localStorage.setItem('profile', JSON.stringify(profile));
      setProfileData(extractedProfileData);
      console.log("extracted profile data", extractedProfileData);

      const totalLikes = extractedProfileData.reduce((sum, post) => sum + (post.num_of_likes || 0), 0);
      localStorage.setItem('totalLikes', totalLikes.toString());
      setTotalLikes(totalLikes);

      if (extractedProfileData.length > 0) {
        localStorage.setItem('profileData', JSON.stringify(extractedProfileData));
        setStoredProfileData(extractedProfileData[0]);
      }

    } catch (err) {
      console.error('Error fetching LinkedIn profile updates:', err);
    }
  };

  useEffect(() => {
    let filteredPosts = [...totalPosts];

    if (searchQuery) {
      filteredPosts = filteredPosts.filter(post =>
        post.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

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
      {storedProfileData && <User data={storedProfileData} />}
      <div className='flex px-8 justify-between'>
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Dropdown dropdown="Sort" options={options2} selectedOption={sortOption} setSelectedOption={setSortOption} />
      </div>
      <div className='w-full flex items-center justify-center gap-4 px-4 text-[16px] leading-[22.4px] cursor-pointer'>
        <div
          onClick={() => handleFilterOptionClick('posts')}
          className={`px-8 py-3 ${filterOption.includes('posts') ? 'bg-[#F1F0F9] text-[#4C41E1] rounded-[50px]' : 'text-[#474751] hover:text-[#4C41E1]'}`}
        >
          Posts
        </div>
        <div
          onClick={() => handleFilterOptionClick('images')}
          className={`px-8 py-3 ${filterOption.includes('images') ? 'bg-[#F1F0F9] text-[#4C41E1] rounded-[50px]' : 'text-[#474751] hover:text-[#4C41E1]'}`}
        >
          Images
        </div>
        <div
          onClick={() => handleFilterOptionClick('comments')}
          className={`px-8 py-3 ${filterOption.includes('comments') ? 'bg-[#F1F0F9] text-[#4C41E1] rounded-[50px]' : 'text-[#474751] hover:text-[#4C41E1]'}`}
        >
          Comments
        </div>
      </div>

      <PostTab posts={posts} setPosts={setPosts} setTotalPosts={setTotalPosts} typeOption="popular-posts" profileData={profileData} />
    </div>
  );
};

export default Home;