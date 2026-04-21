import { Server, Socket } from "socket.io";
import { MessageService } from "../services/messageService.ts";
import { validateCreateMessageRequest } from "../validators.ts";
import { SOCKET_EVENTS, ERROR_MESSAGES } from "../constants.ts";

export function setupWebSocketHandlers(io: Server, messageService: MessageService): void {
    io.on(SOCKET_EVENTS.CONNECTION, (socket: Socket) => {
        console.log(`user joined: ${socket.id}`);

        socket.on(SOCKET_EVENTS.SEND_MESSAGE, async (data) => {
            const validation = validateCreateMessageRequest(data);

            if (!validation.isValid) {
                console.error(validation.error);
                return;
            }

            try {
                const newMessage = await messageService.createMessage(validation.data);
                io.emit(SOCKET_EVENTS.NEW_MESSAGE, newMessage);
            } catch (error) {
                console.error(ERROR_MESSAGES.WEBSOCKET_ERROR, error);
            }
        });

        socket.on(SOCKET_EVENTS.DISCONNECT, () => {
            console.log(`user disconnected: ${socket.id}`);
        });
    });
}
