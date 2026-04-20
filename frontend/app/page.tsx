"use client";

import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";
import { useMessages } from "./hooks/useMessages";

export default function Home() {
    const { messages, isLoading, sendMessage } = useMessages();

    return (
        <main className="w-full h-full flex flex-col bg-white">
            <header className="bg-white border-b border-gray-200 pt-12 pb-3 px-4 flex-shrink-0">
                <h1 className="text-xl font-bold text-center text-gray-900">
                    Zprávy
                </h1>
            </header>

            <div className="flex-1 overflow-y-auto bg-white">
                <MessageList messages={messages} isLoading={isLoading} />
            </div>

            <div className="bg-white border-t border-gray-200 flex-shrink-0 pb-6">
                <MessageForm onSendMessage={sendMessage} />
            </div>
        </main>
    );
}
