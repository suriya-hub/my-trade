"use client";

import { TokenRow } from "./TokenRow";
import { Token } from "../../types/token";

interface Props {
  tokens: Token[];
}

export const TokenTable = ({ tokens }: Props) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>

      <tbody>
        {tokens.map(token => (
          <TokenRow key={token.id} token={token} />
        ))}
      </tbody>
    </table>
  );
};
