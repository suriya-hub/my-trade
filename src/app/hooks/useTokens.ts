import { useQuery } from "@tanstack/react-query";
import { TokenStage } from "../types/token";
import { fetchTokens } from "../services/tokenService";

export const useTokens = (stage: TokenStage) =>
  useQuery({
    queryKey: ["tokens", stage],
    queryFn: () => fetchTokens(stage),
    staleTime: 30_000,
  });
