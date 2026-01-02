"use client";

import { CommonModalProps, SearchModalProps, SearchModalState } from "@/app/types/interface";
import { useState } from "react";
import { FaTimes, FaUserShield, FaShieldAlt, FaShieldVirus, FaInfoCircle } from "react-icons/fa";
import { Tooltip } from "./Tooltip";
import { MevMode } from "@/app/types/types";
import { FC } from "react";
import { FaFire, FaDollarSign } from "react-icons/fa";
import { TbFlame } from "react-icons/tb";
import { closeSearchModal } from "@/app/store/tokenSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, } from "@/app/store";
import { TokenSearch } from "../molecules/TokenSearch";




const tags = [
    { text: "Pump", icon: <FaFire className="w-3 h-3 inline-block mr-1" /> },
    { text: "Bonk", icon: <TbFlame className="w-3 h-3 inline-block mr-1" /> },
    { text: "Bags", icon: <FaDollarSign className="w-3 h-3 inline-block mr-1" /> },
    { text: "USD1", icon: <FaDollarSign className="w-3 h-3 inline-block mr-1" /> },
    { text: "OG Mode" },
    { text: "Graduated" },
];

export const CommonModal = ({
    isOpen,
    title,
    dropList = [],
    onClose,
}: CommonModalProps) => {
    const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
    const [slippage, setSlippage] = useState(activeTab === "buy" ? 20 : 40);
    const [priority, setPriority] = useState(0.001);
    const [bribe, setBribe] = useState(0.01);
    const [autoFee, setAutoFee] = useState(false);
    const [maxFee, setMaxFee] = useState(0.1);
    const [mevMode, setMevMode] = useState<MevMode>("off");
    const [rpc, setRpc] = useState("");
    const mevModes: {
        key: MevMode;
        label: string;
        Icon: React.ElementType;
    }[] = [
            { key: "off", label: "Off", Icon: FaShieldVirus },
            { key: "reduced", label: "Reduced", Icon: FaShieldAlt },
            { key: "secure", label: "Secure", Icon: FaUserShield },
        ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={onClose} />

            <div className="relative w-[420px] rounded-lg bg-[#101114] border border-gray-700 p-5 text-white z-10">
                {/* Modal Header */}
                <div className="flex flex-row items-center justify-between">
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <FaTimes className="cursor-pointer" onClick={onClose} />
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-4 border-b border-gray-700">
                    <button
                        className={`flex-1 py-2 text-sm font-semibold rounded-t cursor-pointer ${activeTab === "buy"
                            ? "bg-gray-800 text-green-400 cursor-pointer"
                            : "text-gray-400 hover:text-white cursor-pointer"
                            }`}
                        onClick={() => {
                            setActiveTab("buy");
                            setSlippage(20);
                        }}
                    >
                        Buy Settings
                    </button>
                    <button
                        className={`flex-1 py-2 text-sm font-semibold rounded-t cursor-pointer${activeTab === "sell"
                            ? "bg-gray-800 text-pink-500 cursor-pointer"
                            : "text-gray-400 hover:text-white cursor-pointer"
                            }`}
                        onClick={() => {
                            setActiveTab("sell");
                            setSlippage(40);
                        }}
                    >
                        Sell Settings
                    </button>
                </div>

                {/* Dropdown (optional) */}
                {dropList.length > 0 && (
                    <div className="grid grid-cols-1 gap-1 mb-4 text-xs">
                        {dropList.map((d, idx) => (
                            <div
                                key={d.label}
                                className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-800 ${d.color ? d.color : "text-gray-400"
                                    }`}
                            >
                                {d.icon && <span>{d.icon}</span>}
                                <span>{d.label}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Inputs */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-gray-400">
                    <div className="flex flex-col items-center bg-gray-900 rounded p-2">
                        <span className="text-white font-semibold">{slippage}%</span>
                        <span>SLIPPAGE</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-900 rounded p-2">
                        <span className="text-white font-semibold">{priority}</span>
                        <span>PRIORITY</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-900 rounded p-2">
                        <span className="text-white font-semibold">{bribe}</span>
                        <span>BRIBE</span>
                    </div>
                </div>

                {/* Auto Fee */}
                <div className="flex items-center justify-between gap-2 mb-4 cursor-pointer">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={autoFee}
                            onChange={(e) => setAutoFee(e.target.checked)}
                            className="h-4 w-4"
                        />
                        <label className="text-sm text-gray-400">Auto Fee</label>
                    </div>
                    <div className="flex items-center gap-2 border border-gray-700 px-2 py-1 rounded-full">
                        <span className="text-sm text-gray-400">MAX FEE</span>
                        <input
                            type="number"
                            value={maxFee}
                            onChange={(e) => setMaxFee(Number(e.target.value))}
                            className="ml-auto w-24 border-none bg-[#0e0f11] px-2 py-1 text-sm text-white"
                            placeholder="MAX FEE"
                        />
                    </div>
                </div>

                {/* MEV Mode */}
                <div className="flex items-center justify-between gap-2 mb-4 text-sm text-blue-400">
                    <div className="flex flex-row items-center gap-2 cursor-pointer">
                        <span className="text-gray-400">MEV Mode</span>
                        <Tooltip content={'KOLs'}>
                            <FaInfoCircle />
                        </Tooltip>
                    </div>
                    <div className="flex gap-2 border border-gray-700 px-2 py-1 rounded">
                        {mevModes.map((d) => (
                            <div
                                key={d.key}
                                onClick={() => setMevMode(d.key)}
                                className={`flex items-center gap-1 px-2 py-1 rounded cursor-pointer ${mevMode === d.key
                                    ? "bg-gray-700 text-blue"
                                    : ""
                                    }`}>
                                <d.Icon className="text-sm" />
                                <span>{d.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RPC */}
                <input
                    type="text"
                    placeholder="RPC https://a...e.com"
                    value={rpc}
                    onChange={(e) => setRpc(e.target.value)}
                    className="w-full mb-4 rounded border border-gray-700 bg-[#0e0f11] px-2 py-1 text-sm text-white"
                />

                {/* Continue */}
                <div className="text-right">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-sm cursor-pointer"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div >
    );
};

export const SearchModal: FC<SearchModalState> = ({ isOpen }) => {

    const dispatch = useDispatch<AppDispatch>();
    const tokensA = useSelector((state: RootState) => Object.values(state.tokens.tokensA));
    const [search, setSearch] = useState("");
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-[#181818] w-[50em] h-[calc(100vh-40px)] my-[20px] p-6 rounded-lg shadow-xl flex flex-col overflow-hidden">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag) => (
                        <span
                            key={tag.text}
                            className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md bg-[#0e0f11] text-gray-100 cursor-pointer hover:bg-gray-700"
                        >
                            {tag.icon}
                            {tag.text}
                        </span>
                    ))}
                </div>

                {/* Search Input */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search by name, ticker, or CA..."
                        className="w-full h-[50px] bg-[#0e0f11] text-gray-100 placeholder-gray-500 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        onClick={() => dispatch(closeSearchModal())}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 text-sm font-bold cursor-pointer"
                    >
                        Esc
                    </button>
                </div>

                {/* History Section */}
                <div className="text-gray-400 text-sm">History</div>
                <TokenSearch tokens={tokensA} buyAmount={0} search={search}
                />
            </div>
        </div>
    );
};

