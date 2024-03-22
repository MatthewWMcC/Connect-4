"use client";
import { io } from "socket.io-client";

let socket;

export default async function socketClient() {
  console.log("socket client");
  await fetch("/api/socket");

  socket = io();

  socket.on("connect", () => {
    console.log("connected");
  });

  return socket;
}
