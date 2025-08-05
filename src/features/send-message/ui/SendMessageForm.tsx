"use client";

import { useState, KeyboardEvent } from "react";
import { useSendMessage } from "../model/useSendMessage";
import { Button } from "@shared/ui/Button";

export function SendMessageForm() {
    const [input, setInput] = useState("");
    const { send } = useSendMessage();

    const handleSend = async () => {
        if (!input.trim()) return;

        try {
            await send(input.trim());
            setInput("");
        } catch (error) {
            console.error("메시지 전송 실패:", error);
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex gap-2">
            <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                전송
            </Button>
        </div>
    );
}
