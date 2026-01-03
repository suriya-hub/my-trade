"use client";

import { Token } from "../../types/interface";
import { TokenPriceCell } from "./TokenPriceCell";
import { Badge } from "./Badge";

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
