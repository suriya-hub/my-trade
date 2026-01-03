"use client";

import { usePriceFlash } from "../../hooks/usePriceFlash";
import { Price } from "./Price";

export const TokenPriceCell = ({ price }: { price: number }) => {
  const flash = usePriceFlash(price);

  return (
    <div className={`flex items-center space-x-2 ${flash === "up"
      ? "text-green-500"
      : flash === "down"
        ? "text-red-500"
        : "text-white"
      }`}
    >
      <Price value={price} />
    </div>
  );
};
