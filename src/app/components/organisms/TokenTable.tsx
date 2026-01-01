import { TokenRow } from "./TokenRow";
import { TokenTableProps } from "../../types/interface";
import { memo } from "react";


export const TokenTable = memo(({ tokens, buyAmount }: TokenTableProps) => {

  return (
    <div className="overflow-hidden rounded-lg border border-gray-800 w-full bg-[#101114]">
      {tokens.map(token => (
        <TokenRow key={token.id} token={token} buyAmount={buyAmount} />
      ))}
    </div>
  );
});

