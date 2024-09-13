import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import Perfomance from "@/components/Perfomance";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import KeyMetrices from "@/components/KeyMetrices";
import { fetchLinkedInAnalyticsUpdates } from "@/services/analytics";
import { ArrowLeftIcon } from "@radix-ui/react-icons";


interface ProfileData {
  creator_profile_image?: string;
  creator_name?: string;
  post_created_at?: string;
}

interface AnalyticsData {
  numProfileViews: number;
  numSearchAppearances: number;
  numConnections: number;
}

export default function Analytics() {
  const [loading, setLoading] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<ProfileData[] | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [profile, setProfile] = useState<any>(null);

  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };


  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      try {
        setProfile(JSON.parse(storedProfile));
      } catch (e) {
        setProfile(storedProfile);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedProfileData = localStorage.getItem('profileData');
        const totalLikes = localStorage.getItem('totalLikes');

        const usernameResult = await new Promise<string | undefined>((resolve) => {
          chrome.storage.local.get('username', (result) => resolve(result.username));
        });

        const username = usernameResult;
        const me = localStorage.getItem('me');

        if (storedProfileData) {
          setProfileData(JSON.parse(storedProfileData));
        }

        if (totalLikes) {
          setLikes(parseInt(totalLikes));
        }

        if (me === username) {
          const urnResult = await new Promise<string | undefined>((resolve) => {
            chrome.storage.local.get('dashEntityUrn', (result) => resolve(result.dashEntityUrn));
          });

          const urn = urnResult;

          if (urn) {
            const data = await fetchLinkedInAnalyticsUpdates(urn);
            setAnalyticsData(data);
          } else {
            console.error("Error: dashEntityUrn not found in local storage");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="content flex flex-col gap-4 px-4">
      <Navbar />
      <Button variant="ghost" size="icon" className="mr-2 my-2" onClick={goToHome}>
        <ArrowLeftIcon className="w-12 h-12" />
      </Button>

      <div className="w-[450px] mb-6">
        {loading ? (
          <>
            <div className="animate-pulse bg-muted rounded-full w-16 h-16 mb-4" />
            <div className="animate-pulse bg-muted rounded w-32 h-6 mb-2" />
            <div className="animate-pulse bg-muted rounded w-24 h-4" />
            <div className="animate-pulse bg-muted rounded w-full h-6 mb-4" />
            <div className="grid grid-cols-2 gap-4">
              <div className="animate-pulse bg-muted rounded-lg p-4" />
              <div className="animate-pulse bg-muted rounded-lg p-4" />
              <div className="animate-pulse bg-muted rounded-lg p-4" />
              <div className="animate-pulse bg-muted rounded-lg p-4" />
            </div>
            <div className="animate-pulse bg-muted rounded w-full h-6 mb-4" />
            <div className="grid grid-cols-1 gap-4">
              <div className="animate-pulse bg-muted rounded-lg p-4" />
              <div className="animate-pulse bg-muted rounded-lg p-4" />
              <div className="animate-pulse bg-muted rounded-lg p-4" />
            </div>
          </>
        ) : (
          <>
            {profileData ?
              <div className="flex items-center gap-8 pl-4 items-start w-full mb-6 text-3xl">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile?.image || ""} alt="User Avatar" />
                  <AvatarFallback>NB</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h2 className="text-3xl leading-[21.6px] font-semibold text-[#2A2930]">
                    {profile?.name || "Anonymous"}
                  </h2>
                  <p className="text-sm text-[#A6A6B3]">
                    You last posted on {profile?.text || "some time ago"}
                  </p>
                </div>
              </div> : <div>No profile data found</div>}
            {analyticsData && <KeyMetrices analyticsData={analyticsData} />}
            {profileData && <Perfomance totalLikes={likes} totalPosts={profileData.length} />}
          </>
        )}
      </div>
    </div>
  );
}





/* */