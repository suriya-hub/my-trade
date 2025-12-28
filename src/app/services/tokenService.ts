import { Token, TokenStage } from "../types/token";

export const fetchTokens = async (stage: TokenStage): Promise<Token[]> => {
  const res = await fetch(`/api/tokens?stage=${stage}`);
  if (!res.ok) throw new Error("Failed to fetch tokens");
  return res.json();
};
