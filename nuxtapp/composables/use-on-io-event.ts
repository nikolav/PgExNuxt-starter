// import { Socket } from "socket.io-client";

interface ISocketEventHandler {
  (...args: any[]): void;
}

export const useOnIOEvent = (e: string, handle: ISocketEventHandler) => {
  const { $socket } = useNuxtApp();
  $socket?.on(e, handle);
  onUnmounted(() => $socket?.off(e, handle));
};
