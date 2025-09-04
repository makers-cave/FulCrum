import { Button } from "@/components/ui/button";
import "./globals.css";
import { BadgePlus } from "lucide-react";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Button variant="destructive" size="lg"><BadgePlus /> Click me2</Button>
    </div>
  );
}
