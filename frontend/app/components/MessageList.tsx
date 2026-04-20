"use client";

import { useEffect, useState, useRef } from "react";

export type Message = {
    id: number;
    text: string;
    user: string;
    added: string;
};

type MessageListProps = {
    messages: Message[];
    isLoading: boolean;
};

export default function MessageList({ messages, isLoading }: MessageListProps) {
    const [currentUser, setCurrentUser] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const saved = localStorage.getItem("currentUser");
        if (saved) setCurrentUser(saved);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-40">
                <p className="text-gray-500 dark:text-gray-400">Načítám zprávy...</p>
            </div>
        );
    }

    if (messages.length === 0) {
        return (
            <div className="flex items-center justify-center h-40">
                <p className="text-gray-500 dark:text-gray-400">Zatím tu nejsou žádné zprávy.</p>
            </div>
        );
    }

    return (
        <div className="px-3 py-4 space-y-2 flex flex-col">
            {[...messages].reverse().map((msg) => {
                const isSent = msg.user === currentUser;
                const time = new Date(msg.added).toLocaleTimeString("cs-CZ", {
                    hour: "2-digit",
                    minute: "2-digit",
                });

                return (
                    <div
                        key={msg.id}
                        className={`flex ${isSent ? "justify-end" : "justify-start"} mb-1`}
                    >
                        <div className={`flex flex-col ${isSent ? "items-end" : "items-start"}`}>
                            {!isSent && (
                                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 mx-3">
                                    {msg.user}
                                </span>
                            )}
                            <div className="flex gap-2 items-end max-w-xs md:max-w-md lg:max-w-lg">
                                <div
                                    className={`px-4 py-2.5 rounded-3xl word-wrap break-words ${
                                        isSent
                                            ? "bg-blue-600 text-white rounded-br-none"
                                            : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none"
                                    }`}
                                >
                                    <p className="text-base leading-5">{msg.text}</p>
                                </div>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-500 mt-1 mx-3">
                                {time}
                            </span>
                        </div>
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>
    );
}
