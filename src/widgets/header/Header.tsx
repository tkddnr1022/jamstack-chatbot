"use client";

import React from "react";
import { useAuth } from "@shared/contexts/AuthContext";
import { Button } from "@shared/ui/Button";

export function Header() {
    const { user, signOut, loading } = useAuth();

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-semibold text-gray-900">
                            Jamstack 챗봇
                        </h1>
                    </div>

                    {user && (
                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-gray-700">
                                <span className="font-medium">
                                    {user.email}
                                </span>
                            </div>
                            <Button
                                onClick={handleSignOut}
                                disabled={loading}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "로그아웃 중..." : "로그아웃"}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
