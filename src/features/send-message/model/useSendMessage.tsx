"use client";

import { supabase } from "@shared/supabase/client";

export function useSendMessage() {
    const send = async (content: string) => {
        const user = await supabase.auth.getUser();
        const { data, error } = await supabase.from("messages").insert([
            {
                content,
                user_id: user.data.user?.id,
            },
        ]);

        if (error) throw error;
        return data;
    };

    return { send };
}
