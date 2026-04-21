import type { CreateMessageInput, CreateMessageRequest } from "./types.ts";
import { VALIDATION, ERROR_MESSAGES } from "./constants.ts";

export function validateCreateMessageRequest(
    data: CreateMessageRequest
): { isValid: false; error: string } | { isValid: true; data: CreateMessageInput } {
    const { text, user } = data;

    if (typeof user !== "string" || !user.trim()) {
        return { isValid: false, error: ERROR_MESSAGES.INVALID_USER_NAME };
    }

    if (user.length > VALIDATION.USER_NAME_MAX_LENGTH) {
        return { isValid: false, error: ERROR_MESSAGES.INVALID_USER_NAME };
    }

    if (typeof text !== "string" || !text.trim()) {
        return { isValid: false, error: ERROR_MESSAGES.INVALID_MESSAGE_TEXT };
    }

    if (text.length > VALIDATION.MESSAGE_TEXT_MAX_LENGTH) {
        return { isValid: false, error: ERROR_MESSAGES.INVALID_MESSAGE_TEXT };
    }

    return {
        isValid: true,
        data: {
            text: text.trim(),
            user: user.trim(),
        },
    };
}
