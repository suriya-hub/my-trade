"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo, useEffect } from "react";
import { RootState } from "./store";
import { useWebSocketMock } from "./hooks/useWebSocketMock";
import { TokenTable } from "./components/organisms/TokenTable";
import { CommonModal, SearchModal } from "./components/molecules/Model";

import {
  FaBolt,
  FaApple,
  FaAndroid,
  FaWindows,
  FaLinux,
} from "react-icons/fa";
import { PType, SortKey, SortOrder } from "./types/types";
import { sortTokens } from "./utils/helper";
import { closeSearchModal, setBuyAmount } from "./store/tokenSlice";
import AxiomPulseHeader from "./components/organisms/header";
import { TokenRowSkeleton } from "./components/molecules/Skeleton";
import { Tooltip } from "./components/atom/Tooltip";


export default function Page() {
  const dispatch = useDispatch();
  useWebSocketMock();


  /* ---------- REDUX DATA ---------- */

  const tokensA = useSelector((state: RootState) => Object.values(state.tokens.tokensA));
  const tokensB = useSelector((state: RootState) => Object.values(state.tokens.tokensB));
  const tokensC = useSelector((state: RootState) => Object.values(state.tokens.tokensC));
  const isSearchOpen = useSelector((state: RootState) => state.tokens.isOpen);


  /* ---------- STATE ---------- */
  const dropList = [
    { label: "20%", icon: <FaApple /> },
    { label: "0.001", icon: <FaAndroid /> },
    { label: "0.01", icon: <FaWindows /> },
    { label: "off", icon: <FaLinux /> },
  ] as const;
  const columns = [
    { title: "New Pair", tokens: tokensA, set: "A", },
    { title: "Final Stretch", tokens: tokensB, set: "B", },
    { title: "Migrated", tokens: tokensC, set: "C", },
  ] as const;
  const [selectedByColumn, setSelectedByColumn] =
    useState<Record<string, PType>>({
      "New Pair": "P1",
      "Final Stretch": "P1",
      "Migrated": "P1",
    });
  const [sortByColumn, setSortByColumn] =
    useState<Record<string, { key: SortKey; order: SortOrder }>>({
      "New Pair": { key: "name", order: "desc" },
      "Final Stretch": { key: "name", order: "desc" },
      "Migrated": { key: "name", order: "desc" },
    });
  const [modalColumn, setModalColumn] = useState<string | null>(null);
  const buyAmount = useSelector((state: RootState) => state.tokens.buyAmount);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  /* ---------------- RENDER ---------------- */

  return (
    <>
      <AxiomPulseHeader />
      <div className="max-w-full mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col) => {
            const sortedTokens = sortTokens(
              col.tokens,
              sortByColumn[col.title].key,
              sortByColumn[col.title].order
            );

            return (
              <div
                key={col.title}
                className="w-full rounded-lg border border-gray-800 bg-[#101114]"
              >
                {/* -------- HEADER -------- */}
                <div className="flex items-center justify-between px-4 py-1 border-b border-gray-800">
                  <h2 className="text-lg font-semibold text-white">
                    {col.title}
                  </h2>

                  <div className="relative">
                    <div className="flex items-center gap-4 rounded-full border border-gray-700 py-0.5 px-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1 cursor-pointer">
                        <FaBolt />
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={buyAmount[col.set]}
                          onChange={(e) => {
                            const value = Number(e.target.value.replace(/[^0-9]/g, ""));
                            dispatch(setBuyAmount({ set: col.set, value }));
                          }}
                          className="max-w-[30px] w-fullborder-none outline-none ring-0focus:outline-nonefocus:ring-0 focus:border-none bg-transparenttext-center"
                        />
                      </div>

                      {/* ---- P1 P2 P3 (GROUPED) ---- */}
                      <div className="relative group flex items-center gap-2">
                        {(["P1", "P2", "P3"] as const).map((p) => (
                          <span
                            key={p}
                            onMouseEnter={() => {
                              setSelectedByColumn((prev) => ({
                                ...prev,
                                [col.title]: p,
                              }));
                            }}
                            onClick={() => setModalColumn(col.title)}
                            className={`cursor-pointer font-semibold transition-colors ${selectedByColumn[col.title] === p ? "text-blue-500" : "text-white"} hover:text-blue-400`} >
                            {p}
                          </span>
                        ))}

                        {/* ---- DROPDOWN ---- */}
                        <div
                          className="absolute right-0 top-full mt-2 w-24 rounded-md border border-gray-700 bg-[#0e0f11] text-xs shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150"
                        >
                          {dropList.map((d, index) => (
                            <div
                              key={d.label}
                              className={`flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-800 ${index === 1
                                ? "text-yellow-400 font-semibold"
                                : "text-gray-400"
                                }`}
                            >
                              {d.icon}
                              <span>{d.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sort Toggle */}
                      <Tooltip content="Sorting">
                        <div className="cursor-pointer">
                          <button
                            onClick={() =>
                              setSortByColumn((prev) => ({
                                ...prev,
                                [col.title]: {
                                  ...prev[col.title],
                                  order: prev[col.title].order === "asc" ? "desc" : "asc",
                                },
                              }))
                            }
                            className="text-gray-400 hover:text-white cursor-pointer"
                          >
                            {sortByColumn[col.title].order === "asc" ? "↑" : "↓"}
                          </button>
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </div>

                {/* -------- TABLE -------- */}
                <div className="flex-1 overflow-y-auto max-h-[calc(100vh-12rem)] p-4 scrollbar-dark">
                  {isLoading ? (
                    <div className="flex flex-col gap-3">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <TokenRowSkeleton key={i} />
                      ))}
                    </div>
                  ) : (
                    <TokenTable tokens={sortedTokens} buyAmount={buyAmount[col.set]} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* -------- MODAL -------- */}
        {modalColumn && (
          <CommonModal
            isOpen={!!modalColumn}
            title="Trade Settings"
            onClose={() => setModalColumn(null)}
          />
        )}

        <SearchModal
          isOpen={isSearchOpen}
        />
      </div>
    </>
  );
}
