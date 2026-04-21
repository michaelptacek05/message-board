"use client";
import { useState } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";

type MessageFormProps = {
    onSendMessage: (user: string, text: string) => void;
};

export default function MessageForm({ onSendMessage }: MessageFormProps) {
    const [text, setText] = useState("");
    const [showUserInput, setShowUserInput] = useState(false);
    const { user, updateUser, isAuthenticated } = useCurrentUser();
    const [tempUserInput, setTempUserInput] = useState("");

    const handleOpenUserInput = () => {
        setTempUserInput(user);
        setShowUserInput(true);
    };

    const handleConfirmUser = () => {
        if (tempUserInput.trim()) {
            updateUser(tempUserInput);
            setShowUserInput(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated || !text.trim()) return;
        onSendMessage(user, text);
        setText("");
    };

    return (
        <form onSubmit={handleSubmit} className="px-3 pt-2 pb-0 space-y-3">
            {showUserInput ? (
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Tvoje jméno"
                        value={tempUserInput}
                        onChange={(e) => setTempUserInput(e.target.value)}
                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        autoFocus
                    />
                    <button
                        type="button"
                        onClick={handleConfirmUser}
                        className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
                    >
                        OK
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={handleOpenUserInput}
                    className="text-xs text-blue-600 font-semibold hover:underline"
                >
                    Přihlášen/a jako: <span className="font-bold">{user}</span>
                </button>
            )}

            <div className="flex gap-2 items-flex-end">
                <textarea
                    placeholder="Napsat zprávu..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none max-h-24"
                    rows={1}
                    style={{ minHeight: "36px" }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e as any);
                        }
                    }}
                />
                <button
                    type="submit"
                    disabled={!isAuthenticated || !text.trim()}
                    className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
                >
                    ↑
                </button>
            </div>
        </form>
    );
}