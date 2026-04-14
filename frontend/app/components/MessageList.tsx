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
    if (isLoading) return <p className="text-gray-500">Načítám zprávy...</p>;
    if (messages.length === 0)
        return <p className="text-gray-500">Zatím tu nejsou žádné zprávy.</p>;

    return (
        <div className="space-y-4">
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className="bg-white p-4 rounded-lg shadow border border-gray-100"
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-gray-800">
                            {msg.user}
                        </span>
                        <span className="text-sm text-gray-400">
                            {new Date(msg.added).toLocaleString("cs-CZ")}
                        </span>
                    </div>
                    <p className="text-gray-700">{msg.text}</p>
                </div>
            ))}
        </div>
    );
}
