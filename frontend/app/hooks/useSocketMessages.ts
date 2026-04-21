import { useEffect, useState, useCallback } from "react";
import { socketClient } from "../services/socket";
import { Message } from "../types/messages";

export function useSocketMessages() {
    const [messages, setMessages] = useState<Message[]>([]);

    const addMessage = useCallback((newMessage: Message) => {
        setMessages((prevMessages) => [newMessage, ...prevMessages]);
    }, []);

    useEffect(() => {
        socketClient.connect();
        socketClient.onNewMessage(addMessage);

        return () => {
            socketClient.offNewMessage(addMessage);
        };
    }, [addMessage]);

    return { addMessage };
}
