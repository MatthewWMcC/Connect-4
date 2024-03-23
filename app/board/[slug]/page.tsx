"use client";

import Board from "@/app/components/board";
import { useGetSocket } from "@/app/hooks/useGetSocket";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

let socket;

export default function Home() {
  const pathname = usePathname();
  const roomId = pathname?.split("/")[2];
  console.log("home");
  const { socket } = useGetSocket();

  // useEffect(() => {
  //   if (socket) {
  //     socket.emit("join-room", roomId);
  //   }
  // }, [socket]);

  // useLayoutEffect(() => {
  //   return () => {
  //     if (socket) {
  //       socket.emit("leave-room", roomId);
  //     }
  //   };
  // }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <Board />
      </div>
    </main>
  );
}
