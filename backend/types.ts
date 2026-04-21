export type Message = {
    id: number;
    text: string;
    user: string;
    added: Date;
};

export type CreateMessageInput = {
    text: string;
    user: string;
};

export type CreateMessageRequest = {
    text?: unknown;
    user?: unknown;
};

export type MessageResponse = Message;

export type ApiErrorResponse = {
    error: string;
};

export type MessageHistoryResponse = Message[];

export const TYPES_MARKER = true as const;
