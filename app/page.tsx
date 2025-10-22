import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <p>Yo ! I am here</p>
      <Button size="sm" variant="destructive">Click me</Button>
    </div>
  );
}

