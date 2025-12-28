export const TOKEN_STAGES = ["new", "active", "final"] as const;
export type TokenStage = (typeof TOKEN_STAGES)[number];

export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  volume: number;
  liquidity: number;
  marketCap: number;
  stage: TokenStage;
  change24h: number;
}
