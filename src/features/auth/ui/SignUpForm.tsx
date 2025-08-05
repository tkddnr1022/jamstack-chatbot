"use client";

import React, { useState } from "react";
import { useAuth } from "@shared/contexts/AuthContext";
import { Button } from "@shared/ui/Button";

interface SignUpFormProps {
    onSwitchToLogin: () => void;
}

export function SignUpForm({ onSwitchToLogin }: SignUpFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validationError, setValidationError] = useState("");
    const { signUp, loading, error, clearError } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError("");

        if (password !== confirmPassword) {
            setValidationError("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (password.length < 6) {
            setValidationError("비밀번호는 최소 6자 이상이어야 합니다.");
            return;
        }

        await signUp(email, password);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (error || validationError) {
            clearError();
            setValidationError("");
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (error || validationError) {
            clearError();
            setValidationError("");
        }
    };

    const handleConfirmPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setConfirmPassword(e.target.value);
        if (error || validationError) {
            clearError();
            setValidationError("");
        }
    };

    const displayError = error || validationError;

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    회원가입
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="signup-email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            이메일
                        </label>
                        <input
                            id="signup-email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="이메일을 입력하세요"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="signup-password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            비밀번호
                        </label>
                        <input
                            id="signup-password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="비밀번호를 입력하세요 (최소 6자)"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirm-password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            비밀번호 확인
                        </label>
                        <input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="비밀번호를 다시 입력하세요"
                        />
                    </div>

                    {displayError && (
                        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                            {displayError}
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "회원가입 중..." : "회원가입"}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        이미 계정이 있으신가요?{" "}
                        <button
                            onClick={onSwitchToLogin}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            로그인
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
