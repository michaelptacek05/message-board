export const API_ENDPOINTS = {
    MESSAGES: "/api/messages",
} as const;

export const SOCKET_EVENTS = {
    CONNECTION: "connection",
    DISCONNECT: "disconnect",
    SEND_MESSAGE: "odeslat_zpravu",
    NEW_MESSAGE: "nova_zprava",
} as const;

export const ERROR_MESSAGES = {
    FETCH_MESSAGES_FAILED: "zpravy se nenacetly",
    SAVE_MESSAGE_FAILED: "zprava se neulozila",
    MISSING_REQUIRED_FIELDS: "text a uzivatel jsou povinne udaje",
    INVALID_MESSAGE_TEXT: "text zpravy je prazdny nebo prilis dlouhy",
    INVALID_USER_NAME: "jmeno uzivatele je prazdne nebo prilis dlouhe",
    WEBSOCKET_ERROR: "chyba WebSocketu",
    LOAD_MESSAGES_ERROR: "chyba pri nacitani zprav",
} as const;

export const VALIDATION = {
    MESSAGE_TEXT_MAX_LENGTH: 500,
    USER_NAME_MAX_LENGTH: 50,
    USER_NAME_MIN_LENGTH: 1,
    MESSAGE_TEXT_MIN_LENGTH: 1,
} as const;

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
} as const;
