import { ErrorHandler } from "@errors";
import { Request, Response, NextFunction } from "express";

export class ErrorHandlerMiddleware{
    static async errorhandlerMiddleware(err: ErrorHandler, req: Request, res: Response, next: NextFunction){
        res.status(err.status || 500).send({
            success: false,
            message: err.message || "Internal sever error"
        })
    }
}