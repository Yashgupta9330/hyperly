import { BiSolidLike } from "react-icons/bi";
import { PiHandsClapping } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";


const reactions = [
  { name: "Like", icon: BiSolidLike, color: "#00A0DC", img: "https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" },
  { name: "Celebrate", icon: PiHandsClapping, color: "#7CB82F", img: "https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" },
  { name: "Love", icon: FaHeart, color: "#DD5143", img: "https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97" },
];

const HeartIcons = () => {
  return (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-20">
          {reactions.map((reaction) => (
            <button
              key={reaction.name}
              className="flex items-center space-x-1 px-3 py-2 hover:bg-gray-100 w-full text-left"
            >
              <reaction.icon color={reaction.color} size={24} />
              <span>{reaction.name}</span>
            </button>
          ))}
        </div>
      )}

export default HeartIcons;