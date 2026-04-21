import { useEffect, useState } from "react";
import { messagesApi } from "../services/api";
import { Message } from "../types/messages";

export function useFetchMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const history = await messagesApi.fetchAll();
                setMessages(history);
                setError(null);
            } catch (err) {
                console.error("Failed to load message history", err);
                setError("Failed to load messages");
            } finally {
                setIsLoading(false);
            }
        };

        loadMessages();
    }, []);

    return { messages, isLoading, error, setMessages };
}
