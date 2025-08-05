export interface User {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignUpCredentials {
    email: string;
    password: string;
    confirmPassword: string;
}
