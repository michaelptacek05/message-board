import { io, Socket } from "socket.io-client";
import { SOCKET_URL, SOCKET_EVENTS } from "../constants/api";
import { Message } from "../types/messages";

let socketInstance: Socket | null = null;

export const socketClient = {
    connect(): Socket {
        if (socketInstance) {
            return socketInstance;
        }

        socketInstance = io(SOCKET_URL);
        return socketInstance;
    },

    onNewMessage(callback: (message: Message) => void): void {
        if (!socketInstance) {
            socketInstance = this.connect();
        }
        socketInstance.on(SOCKET_EVENTS.NEW_MESSAGE, callback);
    },

    offNewMessage(callback: (message: Message) => void): void {
        if (socketInstance) {
            socketInstance.off(SOCKET_EVENTS.NEW_MESSAGE, callback);
        }
    },

    sendMessage(payload: { text: string; user: string }): void {
        if (socketInstance) {
            socketInstance.emit(SOCKET_EVENTS.SEND_MESSAGE, payload);
        }
    },

    disconnect(): void {
        if (socketInstance) {
            socketInstance.disconnect();
            socketInstance = null;
        }
    },

    isConnected(): boolean {
        return socketInstance?.connected ?? false;
    },
};
