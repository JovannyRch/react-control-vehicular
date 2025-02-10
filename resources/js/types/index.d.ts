export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    username: string;
    role: string;
    passsword_copy: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
