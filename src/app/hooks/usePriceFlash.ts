"use client";
import { useEffect, useRef, useState } from "react";

export const usePriceFlash = (price: number) => {
  const prevPrice = useRef<number | null>(null);
  const [dir, setDir] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    if (price === prevPrice.current) return;
    if (prevPrice.current === null) {
      prevPrice.current = price;
      return;
    }
    if (price > prevPrice.current) setDir("up");
    else if (price < prevPrice.current) setDir("down");
    else setDir(null);
    prevPrice.current = price;
    const timer = setTimeout(() => setDir(null), 400);
    return () => clearTimeout(timer);
  }, [price]);
  return dir;
};
