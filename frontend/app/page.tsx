"use client";

import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";
import { useMessages } from "./hooks/useMessages";

export default function Home() {
    const { messages, isLoading, sendMessage } = useMessages();

    return (
        <main className="max-w-2xl mx-auto p-8 font-sans">
            <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
                Mini Message Board (Live)
            </h1>
            <MessageForm onSendMessage={sendMessage} />
            <h2 className="text-2xl font-bold mb-4">Zprávy:</h2>
            <MessageList messages={messages} isLoading={isLoading} />
        </main>
    );
}
