"use client";

import React, { useRef, useEffect } from "react";
import { useGetMessages } from "@features/get-messages/model/useGetMessages";
import { MessageItem } from "@entities/message/ui/MessageItem";
import { useAuth } from "@shared/contexts/AuthContext";

interface MessageListProps {
    className?: string;
}

export function MessageList({ className = "" }: MessageListProps) {
    const { messages, loading, error, hasMore, loadMore } = useGetMessages({
        limit: 20,
        orderBy: "created_at",
        orderDirection: "desc",
    });
    const { user } = useAuth();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 새 메시지가 추가되면 자동으로 스크롤
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop } = e.currentTarget;
        if (scrollTop === 0 && hasMore && !loading) {
            loadMore();
        }
    };

    if (error) {
        return (
            <div
                className={`flex items-center justify-center h-full ${className}`}
            >
                <div className="text-center">
                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                        {error}
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                    >
                        다시 시도
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`flex flex-col h-full overflow-y-auto ${className}`}
            onScroll={handleScroll}
        >
            {loading && messages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600 text-sm">
                            메시지를 불러오는 중...
                        </p>
                    </div>
                </div>
            )}

            {hasMore && (
                <div className="flex justify-center p-4">
                    <button
                        onClick={loadMore}
                        disabled={loading}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium disabled:opacity-50"
                    >
                        {loading ? "불러오는 중..." : "더 많은 메시지 보기"}
                    </button>
                </div>
            )}

            <div className="flex-1 space-y-4 p-4">
                {messages.map(message => (
                    <MessageItem
                        key={message.id}
                        message={message}
                        isOwnMessage={message.user_id === user?.id}
                    />
                ))}
            </div>

            <div ref={messagesEndRef} />
        </div>
    );
}
