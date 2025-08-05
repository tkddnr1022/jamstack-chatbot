"use client";

import { useAuth } from "@shared/contexts/AuthContext";
import { AuthView } from "@views/auth/AuthView";
import { ChatView } from "@views/chat/ChatView";
import { Header } from "@widgets/header/Header";

export default function HomePage() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">로딩 중...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <AuthView />;
    }

    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            <Header />
            <ChatView />
        </div>
    );
}
