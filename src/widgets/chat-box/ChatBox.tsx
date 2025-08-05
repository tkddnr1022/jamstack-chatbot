"use client";

import { MessageList } from "@features/get-messages/ui/MessageList";
import { SendMessageForm } from "@features/send-message/ui/SendMessageForm";

export function ChatBox() {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 min-h-0">
                <MessageList />
            </div>
            <div className="border-t border-gray-200 p-4">
                <SendMessageForm />
            </div>
        </div>
    );
}
