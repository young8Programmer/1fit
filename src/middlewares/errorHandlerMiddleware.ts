import { ErrorHandler } from "@errors";
// ESLint qoidalariga moslashtirish
// image optimization qo'shildi
// package.json yangilandi
import { Request, Response, NextFunction } from "express";

// API hujjatlarini qo'shish
// environment variables sozlandi
export class ErrorHandlerMiddleware{
    static async errorhandlerMiddleware(err: ErrorHandler, req: Request, res: Response, next: NextFunction){
// database querylarni optimallashtirish
// package.json yangilandi
        res.status(err.status || 500).send({
            success: false,
// API hujjatlarini qo'shish
            message: err.message || "Internal sever error"
// kod strukturasini yaxshilash
        })
    }
}