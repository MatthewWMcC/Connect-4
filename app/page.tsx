"use client";

import { useEffect } from "react";
import socketClient from "./socket/socket-client";
import { useRouter } from "next/navigation";
import uniqid from "uniqid";

export default function Home() {
  const router = useRouter();

  const createGame = () => {
    router.push(`/board/${uniqid()}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <button onClick={createGame}>Create Game</button>
        <div className="flex flex-col">
          <button>Join Game</button>
          <input></input>
        </div>
      </div>
    </main>
  );
}
