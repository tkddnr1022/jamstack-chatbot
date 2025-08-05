import { MessageWithUser } from "../model/message";

type Props = {
    message: MessageWithUser;
    isOwnMessage?: boolean;
};

export function MessageItem({ message, isOwnMessage = false }: Props) {
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div
            className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    isOwnMessage
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-900"
                }`}
            >
                {!isOwnMessage && (
                    <div className="text-xs font-medium mb-1 opacity-75">
                        {message.user.email}
                    </div>
                )}
                <div className="text-sm">{message.content}</div>
                <div
                    className={`text-xs mt-1 ${
                        isOwnMessage ? "text-blue-100" : "text-gray-500"
                    }`}
                >
                    {formatTime(message.created_at)}
                </div>
            </div>
        </div>
    );
}
