import { cn } from "@/lib/utils" // optional if you use shadcn's cn helper

interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
  className?: string
}

export function Spinner({ size = "md", text, className }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-4",
  }

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-t-transparent border-primary",
          sizeClasses[size]
        )}
      />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  )
}
