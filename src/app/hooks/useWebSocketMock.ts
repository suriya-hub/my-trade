// src/hooks/useWebSocketMock.ts
"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePrice } from "../store/tokenSlice";
import { RootState } from "../store";

export const useWebSocketMock = () => {
  const dispatch = useDispatch();
  const tokens = useSelector((state: RootState) =>
    Object.values(state.tokens.entities)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      tokens.forEach(token => {
        const newPrice = token.price + (Math.random() - 0.5) * 10;
        dispatch(updatePrice({ id: token.id, price: newPrice }));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [tokens, dispatch]);
};
