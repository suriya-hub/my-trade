import {
    HiOutlineMagnifyingGlass,
    HiOutlineBell,
    HiOutlineStar,
    HiOutlineQuestionMarkCircle,
    HiChevronDown,
} from "react-icons/hi2";
import { FaWallet, FaGear } from "react-icons/fa6";
import { MdOutlineViewList } from "react-icons/md";
import { ReactNode, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { openSearchModal } from "@/app/store/tokenSlice";

export default function AxiomPulseHeader() {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <header className="w-full bg-[#0B0E14] border-b border-white/5">
            <div className="flex items-center justify-between px-4 sm:px-6 h-14">

                {/* Left */}
                <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-2 text-white font-semibold text-sm cursor-pointer">
                        <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center">
                            △
                        </div>
                        <span className="hidden sm:inline">AXIOM</span> <span className="text-white/60 font-normal hidden sm:inline">Pro</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-4 lg:gap-5 text-sm">
                        {["Discover", "Pulse", "Trackers", "Perpetuals", "Yield", "Vision"].map(
                            (item) => (
                                <span
                                    key={item}
                                    className={`cursor-pointer ${item === "Pulse"
                                        ? "text-blue-500 font-medium"
                                        : "text-white/70 hover:text-white"
                                        }`}
                                >
                                    {item}
                                </span>
                            )
                        )}
                    </nav>
                </div>

                {/* Center Search */}
                <div className="hidden md:flex items-center gap-2 bg-[#121620] border border-white/10 rounded-full px-4 h-9 w-[240px] sm:w-[340px] lg:w-[400px]">
                    <HiOutlineMagnifyingGlass className="text-white/50" />
                    <input
                        placeholder="Search by token or CA..."
                        className="bg-transparent outline-none text-sm text-white placeholder:text-white/40 flex-1"
                        onClick={() => dispatch(openSearchModal())}
                    />
                    <span className="text-white/40 text-xs">/</span>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Network dropdown */}
                    <button className="hidden sm:flex items-center gap-2 bg-[#121620] border border-white/10 rounded-full px-3 h-9 text-sm text-white cursor-pointer">
                        SOL <HiChevronDown className="text-xs" />
                    </button>

                    <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-full px-4 h-9 cursor-pointer">
                        Deposit
                    </button>

                    <IconBtn><HiOutlineStar /></IconBtn>
                    <IconBtn><HiOutlineBell /></IconBtn>
                    <IconBtn><FaWallet /></IconBtn>

                    {/* Profile */}
                    <div className="w-8 h-8 rounded-full bg-green-500 text-black text-xs font-bold flex items-center justify-center cursor-pointer">
                        A6
                    </div>
                </div>
            </div>

            {/* Sub Header */}
            <div className="hidden md:flex items-center justify-between px-4 sm:px-6 h-12 bg-[#0B0E14]">
                <div className="flex items-center gap-2 text-white text-base font-medium cursor-pointer">
                    Pulse
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                        <MdOutlineViewList />
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                    <ActionBtn><HiOutlineQuestionMarkCircle /></ActionBtn>
                    <ActionBtn><MdOutlineViewList /></ActionBtn>
                    <ActionBtn><FaGear /></ActionBtn>

                    <button className="flex items-center gap-2 bg-[#121620] border border-white/10 rounded-full px-3 sm:px-4 h-8 text-sm text-white cursor-pointer">
                        Display <HiChevronDown className="text-xs" />
                    </button>
                </div>
            </div>
        </header>
    );
}

function IconBtn({ children }: { children: ReactNode }) {
    return (
        <button className="w-9 h-9 rounded-full bg-[#121620] border border-white/10 flex items-center justify-center text-white/80 hover:text-white cursor-pointer">
            {children}
        </button>
    );
}

function ActionBtn({ children }: { children: ReactNode }) {
    return (
        <button className="w-8 h-8 rounded-full bg-[#121620] border border-white/10 flex items-center justify-center text-white/70 hover:text-white cursor-pointer">
            {children}
        </button>
    );
}
