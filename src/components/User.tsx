
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Component() {
    const navigate = useNavigate();
    const goToAnalytics = () => {
        navigate('/analytics');
      };

    const userData = useSelector((state: any) => state.user);
    console.log("user data",userData)

  return (
    <div className="w-[450px] flex  gap-4 items-center px-4 py-2 bg-white">
      <div className="flex flex-col gap-2 items-center space-x-4 mb-2">
           <Avatar className="w-24 h-24">
            <AvatarImage src={userData.profile_image} alt="User Avatar" />
            <AvatarFallback>NB</AvatarFallback>
          </Avatar>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-[16px] font-semibold">{userData.name}</h2>
          <p className="text-[12px] text-gray-500">You last posted on Aug 07</p>
        </div>
        <Button onClick={goToAnalytics} className="w-full mb-4 text-[12px]" variant="default">View Analytics</Button>
    </div>
    {/*<Card className="flex items-center w-[250px] h-[150px] bg-[#F1F0F9] ml-2">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 justify-between mb-2">
          <div className="text-center space-y-3 mt-3 text-[#474751]">
            <h3 className="text-[16px] leading-tight">Get 2x reach</h3>
            <p className="text-[16px] leading-tight">by fixing</p>
            <p className="text-[16px] leading-tight">your profile!</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-yellow-400">40</span>
        <p className="text-[16px] text-gray-600 mb-2">Profile score</p>
        <button
        className="rounded-full px-[12px] py-[8px] text-[12px] font-semibold bg-[#F1F0F9] border border-[#4C4E41] text-[#4C4E41] hover:bg-[#E5E4ED] transition-colors duration-200"
         >
        Optimize profile
      </button>
        </div>
        </div>
      </CardContent>
    </Card> */}
    </div>
  )
}