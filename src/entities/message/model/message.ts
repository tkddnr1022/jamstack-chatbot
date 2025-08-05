export type Message = {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
};

export type MessageWithUser = Message & {
    user: {
        id: string;
        email: string;
    };
};

export type GetMessagesOptions = {
    limit?: number;
    offset?: number;
    orderBy?: "created_at" | "id";
    orderDirection?: "asc" | "desc";
};
