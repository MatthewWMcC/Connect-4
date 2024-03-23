"use client";

import Board from "@/app/components/board";
import { AppContext } from "@/app/context/appContext";
import { SocketContext } from "@/app/context/socketContext";
import { IAppContext, ISocketContext } from "@/app/utils/types";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
  const { socket } = useContext(SocketContext) as ISocketContext;
  const { id } = useContext(AppContext) as IAppContext;

  const pathname = usePathname();
  const roomId = pathname?.split("/")[2];

  useEffect(() => {
    socket?.emit("join-room", id, roomId);
  }, [socket]);

  useEffect(() => {
    const cleanup = () => {
      console.log("unload");
    };

    window.addEventListener("beforeunload", cleanup);

    return () => {
      window.removeEventListener("beforeunload", cleanup);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <Board />
      </div>
    </main>
  );
}
