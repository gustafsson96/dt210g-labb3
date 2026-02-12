export interface User {
    id: number,
    username: string
}

export interface LoginCredentials {
    username: string,
    password: string
}

export interface AuthRes {
    user: User,
    token: string
}

export interface AuthContext {
    user: User | null,
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}
