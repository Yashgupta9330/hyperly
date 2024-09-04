import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

export default function KeyMetrics() {
  return (
    <div className="max-w-[450px] p-4">
      <h2 className="text-[16px] font-bold mb-4 text-[#2A2930]">Key metrics</h2>
      <div className="flex flex-col gap-4">
      <div className="flex w-full gap-2">
        <Card className="bg-[#f4f4ff] p-4 w-1/2">
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <UserIcon className="text-[#6b6bff] w-6 h-6" />
            </div>
            <div className="text-4xl font-bold">14</div>
            <p className="text-muted-foreground">Followers</p>
            <Badge variant="default" className="bg-green-100 text-green-600 mt-2">
              +100%
            </Badge>
            <p className="text-muted-foreground text-sm mt-2">in last 30 days</p>
          </CardContent>
        </Card>
        <Card className="bg-[#f4f4ff] p-4 w-1/2">
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <LineChartIcon className="text-[#6b6bff] w-6 h-6" />
            </div>
            <div className="text-4xl font-bold">14</div>
            <p className="text-muted-foreground">Impressions</p>
            <Badge variant="default" className="bg-green-100 text-green-600 mt-2">
              +100%
            </Badge>
            <p className="text-muted-foreground text-sm mt-2">in last 30 days</p>
          </CardContent>
        </Card>
        </div>
        <div className="flex gap-2">
        <Card className="bg-white p-4 w-1/2">
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <MessageSquareIcon className="text-muted-foreground w-6 h-6" />
            </div>
            <div className="text-4xl font-bold">14</div>
            <p className="text-muted-foreground">Engagements</p>
            <Badge variant="default" className="bg-green-100 text-green-600 mt-2">
              +100%
            </Badge>
            <p className="text-muted-foreground text-sm mt-2">in last 30 days</p>
          </CardContent>
        </Card>
        <Card className="bg-white p-4 w-1/2">
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <EyeIcon className="text-muted-foreground w-6 h-6" />
            </div>
            <div className="text-4xl font-bold">14</div>
            <p className="text-muted-foreground">Profile visits</p>
            <Badge variant="default" className="bg-red-100 text-red-600 mt-2">
              -10%
            </Badge>
            <p className="text-muted-foreground text-sm mt-2">in last 30 days</p>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}


function EyeIcon(props: IconProps) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function LineChartIcon(props: IconProps) {
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
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  )
}


function MessageSquareIcon(props: IconProps) {
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
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}


function UserIcon(props: IconProps) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}