"use client";

import Board from "@/app/components/board";
import { AppContext } from "@/app/context/appContext";
import { IAppContext } from "@/app/utils/types";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
  const { socket } = useContext(AppContext) as IAppContext;

  const pathname = usePathname();
  const roomId = pathname?.split("/")[2];

  useEffect(() => {
    socket?.emit("join-room", roomId);

    return () => {
      socket?.emit("leave-room", roomId);
    };
  }, [socket]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <Board />
      </div>
    </main>
  );
}
