"use client";

import React, { useState } from "react";
import { LoginForm } from "@features/auth/ui/LoginForm";
import { SignUpForm } from "@features/auth/ui/SignUpForm";

type AuthMode = "login" | "signup";

export function AuthView() {
    const [mode, setMode] = useState<AuthMode>("login");

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {mode === "login" ? (
                    <LoginForm onSwitchToSignUp={() => setMode("signup")} />
                ) : (
                    <SignUpForm onSwitchToLogin={() => setMode("login")} />
                )}
            </div>
        </div>
    );
}
