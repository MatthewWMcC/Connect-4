import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useRoomId = () => {
  const [roomId, setRoomId] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname?.split("/")[2] || "");
    setRoomId(pathname?.split("/")[2] || "");
  }, [pathname]);

  return [roomId];
};
