import { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEYS } from "../constants/api";

export function useCurrentUser() {
    const [user, setUser] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
        if (saved) {
            setUser(saved);
        }
        setIsLoading(false);
    }, []);

    const updateUser = (newUser: string) => {
        const trimmedUser = newUser.trim();
        if (trimmedUser) {
            setUser(trimmedUser);
            localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_USER, trimmedUser);
        }
    };

    const clearUser = () => {
        setUser("");
        localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
    };

    const isAuthenticated = user.length > 0;

    return { user, isLoading, updateUser, clearUser, isAuthenticated };
}
