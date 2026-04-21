import type { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants.ts";

export function globalErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error(err);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error: "Internal server error",
    });
}
