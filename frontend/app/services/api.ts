import { API_ENDPOINTS } from "../constants/api";
import { Message, FetchMessagesResponse, CreateMessageResponse, SendMessagePayload } from "../types/messages";

export const messagesApi = {
    async fetchAll(): Promise<Message[]> {
        const response = await fetch(API_ENDPOINTS.MESSAGES);
        if (!response.ok) {
            throw new Error("Failed to fetch messages");
        }
        return response.json() as Promise<FetchMessagesResponse>;
    },

    async create(payload: SendMessagePayload): Promise<Message> {
        const response = await fetch(API_ENDPOINTS.MESSAGES, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error("Failed to create message");
        }
        return response.json() as Promise<CreateMessageResponse>;
    },
};
