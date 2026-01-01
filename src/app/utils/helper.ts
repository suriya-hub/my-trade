import { TOKEN_STAGES, TokenStage } from "../types/interface";
import { SortKey, SortOrder } from "../types/types";

/* --------------- HELPERS --------------- */

export function sortTokens<T extends Record<string, any>>(
  tokens: T[],
  key: SortKey,
  order: SortOrder
) {
  return [...tokens].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal === bVal) return 0;

    if (order === "asc") {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });
}

export const shortAddress = (address: string) => {
  if (!address) return "";
  if (address.length <= 6) return address;
  return `${address.slice(0, 3)}...${address.slice(-3)}`;
};

export const getRandomImage = () =>
  `https://picsum.photos/50/50?random=${Math.floor(Math.random() * 1000)}`;

export const getRandomStage = (): TokenStage =>
  TOKEN_STAGES[Math.floor(Math.random() * TOKEN_STAGES.length)];

const PREDEFINED_TOKEN_NAMES = [
  "NovaPulse", "LunaFlux", "ApexCoin", "QuantumX", "AtlasPay",
  "Zenith", "OrbitChain", "EchoToken", "Nimbus", "Solara",
  "HelixPay", "Vertex", "CosmoX", "Aurora", "PulseNet",
  "MetaCoin", "Cryptex", "Valora", "Nexo", "BlockZen",
] as const;

export const getRandomTokenName = () =>
  PREDEFINED_TOKEN_NAMES[Math.floor(Math.random() * PREDEFINED_TOKEN_NAMES.length)];

export function formatK(num: number) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
}
