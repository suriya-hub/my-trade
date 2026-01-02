import { ReactNode } from "react";

export const TOKEN_STAGES = ["new", "active", "final"] as const;
export type TokenStage = (typeof TOKEN_STAGES)[number];

export interface Token {
  id: string;
  name: string;
  lname: string;
  symbol: string;
  price: number;
  volume: number;
  liquidity: number;
  marketCap: number;
  stage: TokenStage;
  change24h: number;
  image: string;
  bannerimage: string;
  holder: number;
  website: string;
  tropy: number;
  crown: number;
  userinfo: number;
  pen: number;
  sniper: number;
  insiders: number;
  bundle: number;
  cap: number;
  seconds: number;
  buyAmount: number;
  address: string;
}

export interface BadgeProps {
  label: string;
  color?: "green" | "blue" | "gray";
}

export interface DropItem {
  label: string;
  icon?: React.ReactNode;
  color?: string;
}

export interface CommonModalProps {
  isOpen: boolean;
  title: string;
  dropList?: DropItem[];
  onClose: () => void;
}

export interface PriceProps {
  value: number;
}

export interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export interface UserCardProps {
  token: {
    image: string;
    name: string;
    bannerimage: string;
  };
  username: string;
  displayName: string;
  joinedDate: string;
  following: number;
  followers: number;
  onClose?: () => void;
}

export interface TokenActionsProps {
  onBuy: () => void;
  onWatch: () => void;
}

export interface TokenTableProps {
  tokens: Token[];
  buyAmount: number;
  search?: string;
}

export interface TokenState {
  tokensA: Record<string, Token>;
  tokensB: Record<string, Token>;
  tokensC: Record<string, Token>;
  buyAmount: {
    A: number;
    B: number;
    C: number;
  };
}
export interface CopyToastOptions {
  message?: string;
  icon?: ReactNode;
}

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SearchModalState {
  isOpen: boolean;
}
