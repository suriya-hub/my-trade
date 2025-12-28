import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token, TOKEN_STAGES, TokenStage } from "../types/token";

interface TokenState {
  entities: Record<string, Token>;
}

// ✅ MUST be defined first
const getRandomStage = (): TokenStage =>
  TOKEN_STAGES[Math.floor(Math.random() * TOKEN_STAGES.length)];

export const PREDEFINED_TOKEN_NAMES = [
  "NovaPulse",
  "LunaFlux",
  "ApexCoin",
  "QuantumX",
  "AtlasPay",
  "Zenith",
  "OrbitChain",
  "EchoToken",
  "Nimbus",
  "Solara",
  "HelixPay",
  "Vertex",
  "CosmoX",
  "Aurora",
  "PulseNet",
  "MetaCoin",
  "Cryptex",
  "Valora",
  "Nexo",
  "BlockZen",
] as const;


export const getRandomTokenName = () =>
  PREDEFINED_TOKEN_NAMES[
    Math.floor(Math.random() * PREDEFINED_TOKEN_NAMES.length)
  ];



const initialTokens: Token[] = Array.from({ length: 5 }, () => ({
  id: crypto.randomUUID(),
  name: getRandomTokenName(),
  symbol: `TKN${Math.floor(Math.random() * 100)}`,
  price: Math.random() * 1000,
  volume: Math.random() * 10000,
  liquidity: Math.random() * 10000,
  marketCap: Math.random() * 1000000,
  stage: getRandomStage(),
  change24h: Math.random() * 20 - 10,
}));

const initialState: TokenState = {
  entities: initialTokens.reduce((acc, token) => {
    acc[token.id] = token;
    return acc;
  }, {} as Record<string, Token>),
};

export const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    updatePrice: (state, action: PayloadAction<{ id: string; price: number }>) => {
      const t = state.entities[action.payload.id];
      if (t) t.price = action.payload.price;
    },
    setTokens: (state, action: PayloadAction<Token[]>) => {
      action.payload.forEach(token => (state.entities[token.id] = token));
    },
  },
});

export const { updatePrice, setTokens } = tokenSlice.actions;
export default tokenSlice.reducer;
