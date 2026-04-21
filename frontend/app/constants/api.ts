const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const API_ENDPOINTS = {
    MESSAGES: `${API_BASE_URL}/api/messages`,
} as const;

export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export const SOCKET_EVENTS = {
    SEND_MESSAGE: "odeslat_zpravu",
    NEW_MESSAGE: "nova_zprava",
} as const;

export const LOCAL_STORAGE_KEYS = {
    CURRENT_USER: "currentUser",
} as const;

export const ERROR_MESSAGES = {
    FETCH_MESSAGES_FAILED: "Chyba p\u0159i na\u010d\u00edt\u00e1n\u00ed zpr\u00e1v",
    SEND_MESSAGE_FAILED: "Chyba p\u0159i odesl\u00e1n\u00ed zpr\u00e1vy",
    USER_EMPTY: "Jm\u00e9no u\u017eivatele mus\u00ed b\u00fdt vypln\u011bno",
    MESSAGE_EMPTY: "Zpr\u00e1va mus\u00ed b\u00fdt vypln\u011bna",
} as const;
