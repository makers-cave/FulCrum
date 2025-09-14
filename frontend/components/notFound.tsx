"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface NotFoundProps {
  entityName: string
  backHref?: string
  backLabel?: string
}

export function NotFound({
  entityName = "Item",
  backHref = "/",
  backLabel = "Go back",
}: NotFoundProps) {
  return (
    <Card className="p-6 text-center">
      <h2 className="text-lg font-semibold mb-2">{entityName} Not found</h2>
      <p className="text-muted-foreground mb-4">The {entityName} you’re trying to access does not exist or may have been deleted.</p>
      {backHref && (
        <Link href={backHref}>
          <Button variant="default">{backLabel}</Button>
        </Link>
      )}
    </Card>
  )
}
