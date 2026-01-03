import { TokenActionsProps } from "@/app/types/interface";

export const TokenActions = ({ onBuy, onWatch }: TokenActionsProps) => (
  <div className="flex gap-2">
    <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={onBuy}>
      Buy
    </button>
    <button className="px-2 py-1 bg-gray-200 text-gray-800 rounded" onClick={onWatch}>
      Watch
    </button>
  </div>
);
