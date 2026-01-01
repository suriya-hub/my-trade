"use client";

import { UserCardProps } from "@/app/types/interface";
import { FC } from "react";
import { FaCalendarAlt } from "react-icons/fa";


const UserCard: FC<UserCardProps> = ({
  token,
  username,
  displayName,
  joinedDate,
  following,
  followers,
  onClose,
}) => {
  return (
    <div className="w-80 bg-gray-900 text-white rounded-xl shadow-lg p-4 relative">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
      >
        ✕
      </button>

      {/* Token image */}
      <div className="py-2">
        <img
          src={token.bannerimage}
          alt={token.name}
          className="w-full h-24 object-cover rounded-lg"
        />
      </div>

      {/* Avatar and name */}
      <div className="flex items-center gap-3 mt-2">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 via-blue-500 to-pink-500 flex items-center justify-center text-xl font-bold">
          <img src={token.image} alt={token.name} className="w-24 rounded-full object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-white">{displayName}</span>
          </div>
          <span className="text-gray-400 text-sm">@{username}</span>
        </div>
      </div>

      {/* Joined date */}
      <div className="mt-3 flex items-center gap-2 text-gray-400 text-sm">
        <FaCalendarAlt className="w-4 h-4" />
        Joined {joinedDate}
      </div>

      {/* Following / Followers */}
      <div className="mt-3 flex gap-4 text-sm text-gray-300">
        <span>
          <span className="font-semibold text-white">{following}</span> Following
        </span>
        <span>
          <span className="font-semibold text-white">{followers}</span> Followers
        </span>
      </div>

      {/* Button */}
      <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
        See profile on X
      </button>
    </div>
  );
};

export default UserCard;
