"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@shared/supabase/client";
import {
    Message,
    MessageWithUser,
    GetMessagesOptions,
} from "@entities/message/model/message";

export function useGetMessages(options: GetMessagesOptions = {}) {
    const [messages, setMessages] = useState<MessageWithUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);

    const {
        limit = 50,
        offset = 0,
        orderBy = "created_at",
        orderDirection = "desc",
    } = options;

    const fetchMessages = useCallback(
        async (isInitial = false) => {
            try {
                setLoading(true);
                setError(null);

                // 현재 로그인한 사용자 정보 가져오기
                const {
                    data: { user: currentUser },
                } = await supabase.auth.getUser();

                // 사용자가 로그인되지 않은 경우 처리
                if (!currentUser) {
                    throw new Error("사용자가 로그인되지 않았습니다.");
                }

                // 메시지 가져오기
                let query = supabase
                    .from("messages")
                    .select("*")
                    .order(orderBy, { ascending: orderDirection === "asc" })
                    .limit(limit);

                if (!isInitial && offset > 0) {
                    query = query.range(offset, offset + limit - 1);
                }

                const { data: messagesData, error: messagesError } =
                    await query;

                if (messagesError) {
                    throw messagesError;
                }

                if (messagesData) {
                    console.log(messagesData);
                    // 메시지에 사용자 정보 추가
                    const messagesWithUser: MessageWithUser[] =
                        messagesData.map(message => ({
                            ...message,
                            user: {
                                id: message.user_id,
                                email:
                                    message.user_id === currentUser?.id
                                        ? currentUser.email || "나"
                                        : `사용자-${message.user_id.slice(0, 8)}`,
                            },
                        }));

                    if (isInitial) {
                        setMessages(messagesWithUser);
                    } else {
                        setMessages(prev => [...prev, ...messagesWithUser]);
                    }

                    setHasMore(messagesData.length === limit);
                }
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "메시지를 가져오는 중 오류가 발생했습니다."
                );
            } finally {
                setLoading(false);
            }
        },
        [limit, offset, orderBy, orderDirection]
    );

    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            fetchMessages(false);
        }
    }, [loading, hasMore, fetchMessages]);

    const refresh = useCallback(() => {
        setMessages([]);
        setHasMore(true);
        fetchMessages(true);
    }, [fetchMessages]);

    // 실시간 메시지 구독
    useEffect(() => {
        const channel = supabase
            .channel("supabase_realtime")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "messages",
                },
                async payload => {
                    const newMessage = payload.new as Message;

                    // 현재 로그인한 사용자 정보 가져오기
                    const {
                        data: { user: currentUser },
                    } = await supabase.auth.getUser();

                    // 사용자가 로그인되지 않은 경우 처리
                    if (!currentUser) {
                        console.warn(
                            "사용자가 로그인되지 않아 새 메시지를 처리할 수 없습니다."
                        );
                        return;
                    }

                    const messageWithUser: MessageWithUser = {
                        ...newMessage,
                        user: {
                            id: newMessage.user_id,
                            email:
                                newMessage.user_id === currentUser.id
                                    ? currentUser.email || "나"
                                    : `사용자-${newMessage.user_id.slice(0, 8)}`,
                        },
                    };

                    setMessages(prev => [messageWithUser, ...prev]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // 초기 메시지 로드
    useEffect(() => {
        fetchMessages(true);
    }, [fetchMessages]);

    return {
        messages,
        loading,
        error,
        hasMore,
        loadMore,
        refresh,
    };
}
