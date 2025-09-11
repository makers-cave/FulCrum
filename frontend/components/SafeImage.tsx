"use client"

import Image, { ImageProps } from "next/image"

interface SafeImageProps extends Omit<ImageProps, "src" | "alt"> {
  src?: string | null
  alt?: string
  placeholderSrc?: string
  fallbackAlt?: string
}

export function SafeImage({
  src,
  alt,
  placeholderSrc = "/placeholder.jpg",
  fallbackAlt = "Image",
  ...props
}: SafeImageProps) {
  const validSrc = src && src.trim() !== "" ? src : placeholderSrc
  const safeAlt = alt || fallbackAlt

  return (
    <Image
      src={validSrc}
      alt={safeAlt}
      {...props}
    />
  )
}
