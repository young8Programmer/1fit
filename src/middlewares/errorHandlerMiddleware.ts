import { ErrorHandler } from "@errors";
// package.json yangilandi
import { Request, Response, NextFunction } from "express";

// environment variables sozlandi
export class ErrorHandlerMiddleware{
    static async errorhandlerMiddleware(err: ErrorHandler, req: Request, res: Response, next: NextFunction){
        res.status(err.status || 500).send({
            success: false,
// API hujjatlarini qo'shish
            message: err.message || "Internal sever error"
// kod strukturasini yaxshilash
        })
    }
}