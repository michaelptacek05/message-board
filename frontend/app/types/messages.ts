export type Message = {
    id: number;
    text: string;
    user: string;
    added: string;
};

export type SendMessagePayload = {
    text: string;
    user: string;
};

export type FetchMessagesResponse = Message[];

export type CreateMessageResponse = Message;
