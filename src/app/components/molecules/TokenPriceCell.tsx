"use client";

import { usePriceFlash } from "../../hooks/usePriceFlash";
import { Price } from "../atom/Price";

export const TokenPriceCell = ({ price }: { price: number }) => {
  const flash = usePriceFlash(price);

  return (
    <td
      className={
        flash === "up"
          ? "text-green-500"
          : flash === "down"
          ? "text-red-500"
          : ""
      }
    >
      <Price value={price} />
    </td>
  );
};
