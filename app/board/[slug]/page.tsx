"use client";

import Board from "@/app/components/board";
import socketClient from "@/app/socket/socket-client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

let socket;

export default function Home() {
  const pathname = usePathname();
  const roomId = pathname?.split("/")[2];

  useEffect(() => {
    socket = socketClient();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <Board />
      </div>
    </main>
  );
}
