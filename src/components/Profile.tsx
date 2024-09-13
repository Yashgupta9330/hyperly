import React from "react";

const DefaultUserIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="50"
    height="50"
    fill="currentColor"
    className="w-[50px] h-[50px] rounded-full"
  >
    <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z" />
  </svg>
);

interface ProfileProps {
  src?: string;
}

export const Profile: React.FC<ProfileProps> = ({ src }) => {
  return (
    <div>
      {src ? (
        <img
          src={src}
          alt="Profile Photo"
          className="w-[50px] h-[50px] rounded-full"
        />
      ) : (
        <DefaultUserIcon />
      )}
    </div>
  );
};

export default Profile;
