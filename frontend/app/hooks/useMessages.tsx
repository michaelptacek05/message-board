import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from "../components/MessageList";

export function useMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/messages");
                const data = await res.json();
                setMessages(data);
            } catch (error) {
                console.error("Chyba načítání historie:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
        socketRef.current = io("http://localhost:3001");
        socketRef.current.on("nova_zprava", (newMessage: Message) => {
            setMessages((prevMessages) => [newMessage, ...prevMessages]);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    const sendMessage = (user: string, text: string) => {
        if (socketRef.current) {
            socketRef.current.emit("odeslat_zpravu", { user, text });
        }
    };

    return { messages, isLoading, sendMessage };
}
