export interface LoginForm {
    email: {
        value: string
    },
    password: {
        value: string
    }
}

export interface LoginResponse {
    access_token: string
}