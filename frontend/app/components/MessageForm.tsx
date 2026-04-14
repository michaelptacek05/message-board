"use client";
import { useState } from "react";

type MessageFormProps = {
    onSendMessage: (user: string, text: string) => void;
};

export default function MessageForm({ onSendMessage }: MessageFormProps) {
    const [user, setUser] = useState("");
    const [text, setText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !text) return;
        onSendMessage(user, text);
        setUser("");
        setText("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-10 bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Přidat novou zprávu</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Tvoje jméno"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>
            <div className="mb-4">
                <textarea
                    placeholder="Tvoje zpráva..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[100px]"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
            >
                Odeslat zprávu
            </button>
        </form>
    );
}