"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface EllipsedTextProps {
  text: string
  maxWidth?: string // Tailwind class e.g. "max-w-[200px]" or "max-w-xs"
}

export function EllipsedText({ text, maxWidth = "max-w-[200px]" }: EllipsedTextProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`truncate overflow-hidden whitespace-nowrap cursor-default ${maxWidth}`}
          >
            {text}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
