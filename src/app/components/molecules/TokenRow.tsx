"use client";

import { Token } from "../../types/token";
import { TokenPriceCell } from "../molecules/TokenPriceCell";
import { Badge } from "../atom/Badge";

export const TokenRow = ({ token }: { token: Token }) => (
  <tr className="hover:bg-gray-100 transition">
    <td>{token.name}</td>
    <TokenPriceCell price={token.price} />
    <td>
      <Badge
        label={token.stage}
        color={
          token.stage === "new"
            ? "green"
            : token.stage === "final"
            ? "blue"
            : "gray"
        }
      />
    </td>
  </tr>
);
