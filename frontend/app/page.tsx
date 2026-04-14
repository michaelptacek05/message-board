"use client";

import { useState, useEffect } from "react";
import MessageForm from "./components/MessageForm";
import MessageList, { Message } from "./components/MessageList";

export default function Home() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMessages = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:3001/api/messages");
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error("Chyba při načítání:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <main className="max-w-2xl mx-auto p-8 font-sans">
            <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
                Michaeluv message board
            </h1>
            <MessageForm onMessageAdded={fetchMessages} />
            <h2 className="text-2xl font-bold mb-4">Zprávy:</h2>
            <MessageList messages={messages} isLoading={isLoading} />
        </main>
    );
}
