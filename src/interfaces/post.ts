export interface PostData {
    _id: string | null;
    revision_id: string | null;
    post_created_at: string;
    num_of_likes: number;
    total_engagement: number | null;
    total_shares: number;
    num_of_comments: number;
    text: string;
    post_images: string[];
    username: string;
    creator_name: string;
    creator_profile_image: string;
    linkedin_id: string;
  }
  

