"use client";

import { Token } from "../../types/interface";
import { TokenPriceCell } from "../molecules/TokenPriceCell";
import { FaSearch, FaUser, FaGlobe, FaUsers, FaTrophy, FaCrown, FaBullseye, FaRainbow, FaRegUser, FaCodepen, FaBolt, FaCopy, FaStar, FaCheckCircle, FaCalendarAlt, FaRegClipboard, FaExclamationCircle } from "react-icons/fa";
import { Tooltip } from "../atom/Tooltip";
import UserCard from "../atom/UserCard";
import { copyToClipboard } from "@/app/utils/tokenUtils";
import { formatK, shortAddress } from "@/app/utils/helper";


export const TokenRow = ({ token, buyAmount }: { token: Token, buyAmount: number }) => {


  const onBuyFeatured = () => {
    if (buyAmount === 0) {
      copyToClipboard(token.lname, {
        message: "Minimum buy amount is 0.0001 SOL",
        icon: <FaRegClipboard className="text-blue-500 text-sm" />,
      })
    } else {
      copyToClipboard(token.lname, {
        message: "Transaction failed to send: Insufficient SOL balance for buy amount",
        icon: <FaExclamationCircle className="text-red-500 text-sm" />,
      })
    }
  }

  return (
    <>
      <div className="hover:bg-gray-900 text-white transition border border-gray-800 flex items-center justify-between text-white p-3 rounded-lg w-full gap-4 text-sm">
        {/* Left: Image */}
        <div className="inline-flex flex-col items-center max-w-[56px]">
          <div className="flex items-center gap-3 border-[2px] border-blue-800 rounded cursor-pointer group">
            <div className="relative w-16 h-16 bg-gray-700 flex items-center justify-center">
              <Tooltip
                content={
                  <div className="w-[260px] h-[260px] rounded-lg overflow-hidden bg-black">
                    <img
                      src={token.image}
                      alt={token.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                }
              >
                <img
                  src={token.image}
                  alt={token.name}
                  className="w-16 h-16 rounded object-cover cursor-pointer"
                />
              </Tooltip>

              <Tooltip content="Featured Token">
                <FaStar className="absolute -bottom-1 -right-1 w-4 h-4 border border-blue-800 text-yellow-400 bg-gray-900 rounded-full p-1 text-sm cursor-pointer" />
              </Tooltip>
            </div>
          </div>

          {/* Address */}
          <Tooltip content={`Copy ${token.address}pump`}>
            <div className="mt-1 w-full text-xs text-center truncate cursor-pointer text-gray-400 hover:text-blue-400"
              onClick={() => {
                copyToClipboard(token.lname, {
                  message: "Address copied to clipboard",
                  icon: <FaRegClipboard className="text-blue-500 text-sm" />,
                })
              }}>
              {shortAddress(token.address)}
            </div>
          </Tooltip>
        </div>


        {/* Middle */}
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          {/* Name */}

          <div className="flex gap-2 items-center min-w-0 cursor-pointer">
            <span className="font-bold text-white truncate">
              {token.name}
            </span>
            <Tooltip content={token.lname}>
              <span className="text-gray-400 truncate hover:text-blue-400">
                {token.lname}
              </span>
            </Tooltip>
            <div
              onClick={() =>
                copyToClipboard(token.lname, {
                  message: "Address copied to clipboard",
                  icon: <FaRegClipboard className="text-blue-500 text-sm" />,
                })
              }
            >
              <FaCopy className="text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <div className="flex flex-row gap-1 cursor-pointer">
              <span className="text-green-400 font-mono font-bold">{token.seconds}s</span>
            </div>
            <div className="flex flex-row gap-1 cursor-pointer">
              <Tooltip content={
                <UserCard
                  token={token}
                  username="OraxLabs"
                  displayName="OraxLabs"
                  joinedDate="Dec 2025"
                  following={3}
                  followers={15}
                  onClose={() => alert("Close button clicked")}
                />
              }>
                <span className="text-gray-400 truncate hover:text-blue-400">
                  <FaUser />
                </span>
              </Tooltip>
            </div>
            <Tooltip content={token.website}>
              <div className="flex flex-row gap-1 cursor-pointer"><FaGlobe /></div>
            </Tooltip>
            <div className="flex flex-row gap-1 cursor-pointer"><FaSearch /></div>
            <Tooltip content={'Holders'}>
              <div className="flex flex-row gap-1 cursor-pointer"><FaUsers /><span>{token.holder}</span></div>
            </Tooltip>
            <Tooltip content={'KOLs'}>
              <div className="flex flex-row gap-1 cursor-pointer">
                <FaTrophy />
                <span>{token.tropy}</span>
              </div>
            </Tooltip>
            <Tooltip content={'Dev Migration/Created'}>
              <div className="flex flex-row gap-1 cursor-pointer">
                <FaCrown />
                <span>{token.crown}/20</span>
              </div>
            </Tooltip>
          </div>
          {/* Stat badges */}
          <div className="flex gap-2 items-center text-xs">
            <div className="flex flex-row gap-1 cursor-pointer">
              <FaRegUser className="text-red-400" />
              <span className="text-red-400">20%</span>
            </div>
            <Tooltip content={'Dev Migration/Created'}>
              <div className="flex flex-row gap-1 cursor-pointer">
                <FaCodepen className="text-green-400" />
                <span className="text-green-400">{token.pen}%</span>
              </div>
            </Tooltip>
            <Tooltip content={'Snipers Holding'}>
              <div className="flex flex-row gap-1 cursor-pointer">
                <FaBullseye className="text-red-400" />
                <span className="text-red-400">{token.sniper}%</span>
              </div>
            </Tooltip>
            <Tooltip content={'Insider Holding'}>
              <div className="flex flex-row gap-1 cursor-pointer">
                <FaRainbow className="text-green-400" />
                <span className="text-green-400">{token.bundle}%</span>
              </div>
            </Tooltip>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-end gap-1">
          <Tooltip content={'Market Cap'}>
            <div className="font-bold cursor-pointer">
              <span className="text-gray-400 text-xs px-1">MC</span>
              ${formatK(token.cap)}
            </div>
          </Tooltip>
          <Tooltip content={'Volume'}>
            <div className="flex flex-row text-gray-400 gap-2 cursor-pointer">
              V <TokenPriceCell price={token.price} />
            </div>
          </Tooltip>
          <div className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-full font-bold text-xs cursor-pointer"
            onClick={() => onBuyFeatured()}>
            <FaBolt />
            {buyAmount} SOL
          </div>
        </div>
      </div>
    </>
  );
};