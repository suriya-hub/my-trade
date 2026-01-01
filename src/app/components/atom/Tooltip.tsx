"use client";

import { TooltipProps } from "@/app/types/interface";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { useState } from "react";


export const Tooltip = ({ content, children }: TooltipProps) => {
  const [open, setOpen] = useState(false);

  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root open={open} onOpenChange={setOpen}>
        <TooltipPrimitive.Trigger asChild>
          {children}
        </TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side="right"
            sideOffset={12}
            collisionPadding={12}
            className="
              z-50 rounded-xl border border-gray-700
              bg-[#0b0f14] p-2 shadow-2xl text-xs leading-tight
              animate-in fade-in zoom-in-95
            "
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-[#0b0f14]" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
