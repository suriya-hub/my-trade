"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { TokenTable } from "./components/organisms/TokenTable";
import { RootState } from "./store";
import { useWebSocketMock } from "./hooks/useWebSocketMock";


export default function Page() {
  // Initialize mock WebSocket updates
  useWebSocketMock();

  // Get tokens from Redux
  const tokens = useSelector((state: RootState) =>
    Object.values(state.tokens.entities)
  );

  console.log(tokens, "tokens");

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-xl font-semibold mb-6">Token Discovery</h1>
      <div className="rounded-lg border border-white/10 overflow-hidden">
        <TokenTable tokens={tokens} />
      </div>
    </div>
  );
}
