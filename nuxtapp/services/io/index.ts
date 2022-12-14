import { io, Socket } from "socket.io-client";
import { OrNull } from "@/types";
import { IO_SERVER } from "@/config";

export const configureIO = () => {
  let IO: OrNull<Socket> = null;
  try {
    IO = io(IO_SERVER, { withCredentials: true });
  } catch (error) {}
  return IO;
};
