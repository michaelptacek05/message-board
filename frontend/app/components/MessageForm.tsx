"use client";

import { useState } from "react";

type MessageFormProps = {
    onMessageAdded: () => void;
};

export default function MessageForm({ onMessageAdded }: MessageFormProps) {
    const [user, setUser] = useState("");
    const [text, setText] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !text) return;

        try {
            await fetch("http://localhost:3001/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user, text }),
            });

            setUser("");
            setText("");
            onMessageAdded();
        } catch (error) {
            console.error("Chyba při odesílání:", error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-10 bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200"
        >
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
                    className="w-full p-2 border border-gray-300 rounded min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-400"
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
