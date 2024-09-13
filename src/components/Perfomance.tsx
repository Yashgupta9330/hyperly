import { Card } from "./ui/card";

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

interface PerfomanceProps {
  totalPosts: number;
  totalLikes: number;
}

export default function Perfomance({ totalPosts, totalLikes }: PerfomanceProps) {
  return (
    <div className="w-[450px] p-4">
      <h2 className="text-[16px] font-bold mb-4 text-[#2A2930]">Perfomance</h2>
      <div className="flex gap-4">
        <Card className="flex flex-col w-[30%] p-4">
          <div className="text-4xl font-bold">{totalPosts}</div>
          <div className="text-[16px]">Total posts</div>
          <div className="text-muted-foreground text-sm">since 2019</div>
        </Card>
        <div className="flex flex-col w-[60%] gap-4">
          <Card className="flex flex-row items-center p-4 bg-[#f5f5ff]">
            <FlameIcon className="text-[#6b4eff] w-6 h-6 mr-2" />
            <div className="text-4xl font-bold">{totalPosts}</div>
            <div className="text-[16px] ml-2">Total posts</div>
          </Card>
          <Card className="flex flex-row items-center p-4 bg-[#f5f5ff]">
            <ThumbsUpIcon className="text-[#6b4eff] w-6 h-6 mr-2" />
            <div className="text-4xl font-bold">{totalLikes}</div>
            <div className="text-[16px] ml-2">Total likes</div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FlameIcon(props: IconProps) {
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
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function ThumbsUpIcon(props: IconProps) {
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
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}
