import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchModalState, Token, TokenState } from "../types/interface";
import { TokensKey } from "../types/types";
import { getRandomImage, getRandomStage, getRandomTokenName } from "../utils/helper";

/* --------------------------
 Create mock token
---------------------------*/
const createMockToken = (): Token => ({
  id: crypto.randomUUID(),
  name: getRandomTokenName(),
  lname: `${getRandomTokenName()} Protocol`,
  symbol: `TKN${Math.floor(Math.random() * 100)}`,
  price: Math.random() * 1000,
  volume: Math.random() * 10000,
  liquidity: Math.random() * 10000,
  marketCap: Math.random() * 1_000_000,
  cap: Math.random() * 1_000_000,
  stage: getRandomStage(),
  change24h: Math.random() * 20 - 10,
  image: getRandomImage(),
  bannerimage: getRandomImage(),
  holder: Math.floor(Math.random() * 50_000),
  website: `https://${getRandomTokenName().toLowerCase()}.com`,
  tropy: Math.floor(Math.random() * 5),
  crown: Math.floor(Math.random() * 3),
  userinfo: Math.floor(Math.random() * 100),
  pen: Math.floor(Math.random() * 10),
  sniper: Math.floor(Math.random() * 10),
  insiders: Math.floor(Math.random() * 20),
  bundle: Math.floor(Math.random() * 5),
  seconds: Math.floor(Math.random() * 5),
  buyAmount: 20,
  address: crypto.randomUUID().replace(/-/g, ''),
});

/* --------------------------
 Create token set
---------------------------*/
const createRandomTokens = (count: number) =>
  Array.from({ length: count }, createMockToken).reduce(
    (acc, token) => {
      acc[token.id] = token;
      return acc;
    },
    {} as Record<string, Token>
  );

/* --------------------------
 Numeric keys
---------------------------*/
type NumericTokenKey = {
  [K in keyof Token]: Token[K] extends number ? K : never
}[keyof Token];

const COUNTER_KEYS: NumericTokenKey[] = [
  "holder",
  "tropy",
  "crown",
  "userinfo",
  "pen",
  "sniper",
  "insiders",
  "bundle",
];

const LIMITS: Partial<Record<NumericTokenKey, number>> = {
  tropy: 5,
  crown: 3,
  bundle: 5,
  seconds: 1,
};

/* --------------------------
 Randomize stats (WebSocket-like)
---------------------------*/
const randomizeTokenStats = (token: Token) => {
  token.price = Math.max(0, token.price + (Math.random() - 0.5) * 20);
  token.volume = Math.max(0, token.volume + Math.random() * 500);
  token.liquidity = Math.max(0, token.liquidity + Math.random() * 300);
  token.marketCap = Math.max(0, token.marketCap + Math.random() * 1500);
  token.cap = Math.max(0, token.cap + Math.random() * 1000);
  token.seconds = Math.max(0, token.seconds + 1);

  token.change24h = Math.max(
    -20,
    Math.min(20, token.change24h + (Math.random() - 0.5) * 2)
  );

  COUNTER_KEYS.forEach(key => {
    const delta = Math.floor(Math.random() * 3) - 1; // -1 | 0 | +1
    const next = Math.max(0, token[key] + delta);
    token[key] = LIMITS[key] ? Math.min(next, LIMITS[key]!) : next;
  });
};

/* --------------------------
 Initial State
---------------------------*/
interface CombinedState extends TokenState, SearchModalState {}

const initialState: CombinedState = {
  tokensA: createRandomTokens(2),
  tokensB: createRandomTokens(2),
  tokensC: createRandomTokens(2),
  buyAmount: { A: 0, B: 0, C: 0 },
  isOpen: false, // search modal
};

/* --------------------------
 Slice
---------------------------*/
export const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    // Token actions
    updateRandomToken: (
      state,
      action: PayloadAction<{ set: "A" | "B" | "C" }>
    ) => {
      const setKey: TokensKey = `tokens${action.payload.set}`;
      const tokens = Object.values(state[setKey]);
      if (!tokens.length) return;
      const token = tokens[Math.floor(Math.random() * tokens.length)];
      randomizeTokenStats(token);
    },
    setBuyAmount: (
      state,
      action: PayloadAction<{ set: "A" | "B" | "C"; value: number }>
    ) => {
      state.buyAmount[action.payload.set] = action.payload.value;
    },

    // Search modal actions
    openSearchModal: (state) => {
      state.isOpen = true;
    },
    closeSearchModal: (state) => {
      state.isOpen = false;
    },
    toggleSearchModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

/* --------------------------
 Exports
---------------------------*/
export const {
  updateRandomToken,
  setBuyAmount,
  openSearchModal,
  closeSearchModal,
  toggleSearchModal,
} = tokenSlice.actions;

export default tokenSlice.reducer;
