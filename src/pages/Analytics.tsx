import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import Perfomance from "@/components/Perfomance";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import KeyMetrices from "@/components/KeyMetrices";
import LinkedInAuth from "@/components/LinkedinAuth";


interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

export default function Analytics() {
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className='content flex flex-col gap-4 px-4'>
     <Navbar />
     <Button variant="ghost" size="icon" className="mr-2 my-2" onClick={goToHome}>
          <ArrowLeftIcon className="w-12 h-12" />
      </Button> 
      {loading ? (
        <div className="flex flex-col items-center w-[450px] mb-6">
          <div className="animate-pulse bg-muted rounded-full w-16 h-16 mb-4" />
          <div className="animate-pulse bg-muted rounded w-32 h-6 mb-2" />
          <div className="animate-pulse bg-muted rounded w-24 h-4" />
        </div>
      ) : (
        <div className="flex items-center gap-8 pl-4 items-start w-full mb-6 text-3xl">
          <Avatar className="w-24 h-24">
            <AvatarImage src="https://s3-alpha-sig.figma.com/img/f328/afee/754311cf956d33b9ff4d783aca660803?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BkExWfBq72qCRD82DS1QG-QEGTp2EUzHpLztNRDS~smNpVlPPohtwXrjGx1zlj2SBhy28udQKZL775A9gGx2jdMQPqYeGgjXeVqG3ruQ9jl04jtGM~lD5nUtE-8uwi3kFwYivDH-UMZKy~~956OT5s8VCUWjPptZEAVZLVTLTyQyRB5fjCG675NL6eP4cqJVy9wbRUvpztVn112~eCFJPlzuwqUwo2nJ8y69A-Y28ewb2jDmC8AKfvd0wSyjrmb3WM~rDSpc1T9U8O-M2sGlxGfo61M0ifyajUxIEZBi3CcEOgJpZGf9FyPd7CiL~w~B6Jd4wLlqPa4nKsgmkWNM8Q__" alt="User Avatar" />
            <AvatarFallback>NB</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
          <h2 className="text-3xl leading-[21.6px] font-semibold text-[#2A2930]">Nagesh Bansal</h2>
          <p className="text-sm leading-[##A6A6B3] text-[#A6A6B3]">You last posted on Aug 07</p>
          </div>
        </div>
      )}
      {loading ? (
        <div className="w-[450px] mb-6">
          <div className="animate-pulse bg-muted rounded w-full h-6 mb-4" />
          <div className="grid grid-cols-2 gap-4">
            <div className="animate-pulse bg-muted rounded-lg p-4" />
            <div className="animate-pulse bg-muted rounded-lg p-4" />
            <div className="animate-pulse bg-muted rounded-lg p-4" />
            <div className="animate-pulse bg-muted rounded-lg p-4" />
          </div>
        </div>
      ) : (
         <KeyMetrices/>
      )}
      {loading ? (
        <div className="w-[450px]">
          <div className="animate-pulse bg-muted rounded w-full h-6 mb-4" />
          <div className="grid grid-cols-1 gap-4">
            <div className="animate-pulse bg-muted rounded-lg p-4" />
            <div className="animate-pulse bg-muted rounded-lg p-4" />
            <div className="animate-pulse bg-muted rounded-lg p-4" />
          </div>
        </div>
      ) : (
        <Perfomance/>
      )}
    </div>
  )
}




  function ArrowLeftIcon(props: IconProps) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
    )
  }
  
  

  
  