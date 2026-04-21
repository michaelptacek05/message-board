import { useEffect, useState } from "react";
import { useFetchMessages } from "./useFetchMessages";
import { socketClient } from "../services/socket";
import { Message } from "../types/messages";

export function useMessages() {
    const { messages: fetchedMessages, isLoading } = useFetchMessages();
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        setMessages(fetchedMessages);
    }, [fetchedMessages]);

    useEffect(() => {
        socketClient.connect();

        const handleNewMessage = (newMessage: Message) => {
            setMessages((prevMessages) => [newMessage, ...prevMessages]);
        };

        socketClient.onNewMessage(handleNewMessage);

        return () => {
            socketClient.offNewMessage(handleNewMessage);
        };
    }, []);

    const sendMessage = (user: string, text: string) => {
        socketClient.sendMessage({ user, text });
    };

    return { messages, isLoading, sendMessage };
}
