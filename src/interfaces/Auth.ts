export interface User {
    id: number,
    username: string
}

export interface Login {
    username: string,
    password: string
}

export interface AuthRes {
    user: User,
    token: string
}

export interface AuthContext {
    user: User | null,
    login: (credentials: Login) => Promise<void>;
    logout: () => void;
}