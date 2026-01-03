import { memo, useEffect, useState } from "react";
import { TokenTableProps } from "@/app/types/interface";
import { formatK } from "@/app/utils/helper";
import { FaBolt, FaLink, FaRegCopy } from "react-icons/fa";
import { TokenSearchSkeleton } from "./Skeleton";

export const TokenSearch = ({ tokens, buyAmount, search }: TokenTableProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [visibleTokens, setVisibleTokens] = useState(tokens);

    useEffect(() => {
        if (search?.trim() === "") {
            setVisibleTokens([]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        const timer = setTimeout(() => {
            setVisibleTokens(tokens);
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [search]);


    if (!search) return null;
    if (isLoading) {
        return (
            <div className="flex flex-col gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <TokenSearchSkeleton key={i} />
                ))}
            </div>
        );
    }

    /* -------- RESULTS -------- */
    return (
        <div className="flex flex-col gap-3">
            {visibleTokens.map((searchData) => (
                <div
                    key={searchData.id}
                    className="flex items-center justify-between w-full bg-[#1b1d22] rounded-xl px-4 py-3 text-sm"
                >
                    {/* LEFT */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <img
                                src={searchData.image}
                                className="w-10 h-10 rounded-md border border-green-500"
                            />
                            <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 text-[9px] flex items-center justify-center text-black font-bold">
                                3
                            </span>
                        </div>

                        <div>
                            <div className="flex items-center gap-1 text-white font-semibold">
                                {searchData.name}
                                <FaRegCopy className="text-gray-500 text-xs cursor-pointer hover:text-gray-300" />
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <span className="text-green-400 font-medium">7mo</span>
                                <FaLink className="cursor-pointer hover:text-gray-200" />
                            </div>
                        </div>
                    </div>

                    {/* CENTER */}
                    <div className="flex items-center gap-8 text-xs">
                        <div className="text-gray-400">
                            MC{" "}
                            <span className="text-white font-semibold">
                                ${formatK(searchData.cap)}
                            </span>
                        </div>
                        <div className="text-gray-400">
                            V <span className="text-white font-semibold">$0</span>
                        </div>
                        <div className="text-gray-400">
                            L <span className="text-white font-semibold">$8K</span>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <button className="w-8 h-8 rounded-full bg-[#2b5cff] flex items-center justify-center hover:bg-[#3b6dff] transition">
                        <FaBolt className="text-white text-sm" />
                    </button>
                </div>
            ))}
        </div>
    );
}

