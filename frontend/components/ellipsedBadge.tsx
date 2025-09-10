
"use client"

import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import * as React from "react"

interface EllipsedBadgeProps {
  text: string
  maxWidth?: string // Tailwind max-w utility, e.g. "max-w-[120px]"
  variant?: React.ComponentProps<typeof Badge>["variant"]
}

export function EllipsedBadge({
  text,
  maxWidth = "max-w-[120px]",
  variant = "secondary",
  ...props
}: EllipsedBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant={variant}
            className={`${maxWidth} truncate cursor-default`}
            {...props}
          >
            {text}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
