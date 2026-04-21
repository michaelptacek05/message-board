import { useCallback } from "react";
import { socketClient } from "../services/socket";
import { useCurrentUser } from "./useCurrentUser";

export function useMessageSubmit() {
    const { user } = useCurrentUser();

    const submit = useCallback(
        (text: string) => {
            if (!user || !text.trim()) {
                return false;
            }

            socketClient.sendMessage({
                user,
                text: text.trim(),
            });

            return true;
        },
        [user]
    );

    return { submit, canSubmit: user.length > 0 };
}
