"use client";

import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@base-ui/react/tooltip";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
  align?: "left" | "right";
  className?: string;
}

export function CopyButton({ text, align = "left", className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (text) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger
          onClick={handleCopy}
          className={cn(
            "cursor-pointer p-2 rounded-md hover:bg-neutral-800 active:text-neutral-100 active:bg-neutral-700 transition-colors text-neutral-400 hover:text-neutral-200",
            align === "left" ? "self-start" : "self-end",
            className
          )}
        >
          {copied ? (
            <Check className="w-4 h-4 text-neutral-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner side="bottom" sideOffset={8}>
            <Tooltip.Popup
              className="
                px-2 py-1 rounded-md 
                bg-neutral-800 text-neutral-100 text-sm 
                shadow-lg
                origin-[var(--transform-origin)]
                transition-[transform,opacity]
                duration-200
                ease-out
                data-[starting-style]:opacity-0 
                data-[starting-style]:scale-95
                data-[ending-style]:opacity-0 
                data-[ending-style]:scale-95
              "
            >
              {copied ? "已复制" : "复制"}
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
