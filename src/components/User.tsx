
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useNavigate } from "react-router-dom";

export default function Component() {
    const navigate = useNavigate();
    const goToAnalytics = () => {
        navigate('/analytics');
      };

  return (
    <div className="w-[450px] flex  gap-4 items-center px-4 py-2 bg-white">
      <div className="flex flex-col gap-2 items-center space-x-4 mb-2">
           <Avatar className="w-24 h-24">
            <AvatarImage src="https://s3-alpha-sig.figma.com/img/f328/afee/754311cf956d33b9ff4d783aca660803?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BkExWfBq72qCRD82DS1QG-QEGTp2EUzHpLztNRDS~smNpVlPPohtwXrjGx1zlj2SBhy28udQKZL775A9gGx2jdMQPqYeGgjXeVqG3ruQ9jl04jtGM~lD5nUtE-8uwi3kFwYivDH-UMZKy~~956OT5s8VCUWjPptZEAVZLVTLTyQyRB5fjCG675NL6eP4cqJVy9wbRUvpztVn112~eCFJPlzuwqUwo2nJ8y69A-Y28ewb2jDmC8AKfvd0wSyjrmb3WM~rDSpc1T9U8O-M2sGlxGfo61M0ifyajUxIEZBi3CcEOgJpZGf9FyPd7CiL~w~B6Jd4wLlqPa4nKsgmkWNM8Q__" alt="User Avatar" />
            <AvatarFallback>NB</AvatarFallback>
          </Avatar>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-[16px] font-semibold">Nagesh Bansal</h2>
          <p className="text-[12px] text-gray-500">You last posted on Aug 07</p>
        </div>
        <Button onClick={goToAnalytics} className="w-full mb-4" variant="default">View Analytics</Button>
    </div>
    <Card className="flex items-center w-[250px] h-[150px] bg-[#F1F0F9] ml-2">
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
    </Card>
    </div>
  )
}