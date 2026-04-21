import { Router } from "express";
import type { Request, Response } from "express";
import { MessageService } from "../services/messageService.ts";
import { validateCreateMessageRequest } from "../validators.ts";
import { API_ENDPOINTS, HTTP_STATUS, ERROR_MESSAGES } from "../constants.ts";

export function createMessageRoutes(messageService: MessageService): Router {
    const router = Router();

    router.get(API_ENDPOINTS.MESSAGES, async (req: Request, res: Response) => {
        try {
            const messages = await messageService.fetchAllMessages();
            res.status(HTTP_STATUS.OK).json(messages);
        } catch (error) {
            console.error(ERROR_MESSAGES.LOAD_MESSAGES_ERROR, error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                error: ERROR_MESSAGES.FETCH_MESSAGES_FAILED,
            });
        }
    });

    router.post(API_ENDPOINTS.MESSAGES, async (req: Request, res: Response): Promise<any> => {
        const validation = validateCreateMessageRequest(req.body);

        if (!validation.isValid) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                error: validation.error,
            });
        }

        try {
            const newMessage = await messageService.createMessage(validation.data);
            res.status(HTTP_STATUS.CREATED).json(newMessage);
        } catch (error) {
            console.error(ERROR_MESSAGES.SAVE_MESSAGE_FAILED, error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                error: ERROR_MESSAGES.SAVE_MESSAGE_FAILED,
            });
        }
    });

    return router;
}
