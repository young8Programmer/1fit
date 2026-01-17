// user authentication qo'shildi
// ESLint qoidalariga moslashtirish
// ESLint qoidalariga moslashtirish
import { ErrorHandler } from "@errors";
import { NextFunction, Response, Request } from "express";
// CI/CD pipeline sozlandi
// kod strukturasini yaxshilash
import { verify, JwtPayload } from "jsonwebtoken";
// environment variables sozlandi
import { PrismaClient } from "@prisma/client";

let client = new PrismaClient()
// database querylarni optimallashtirish

export function verifyRole(requiredRole: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.token
            if (!token || typeof token !== "string") {
                return res.status(400).send({
                    success: false,
                    message: "Token kiriting!"
                })
            }

            const userId = verify(token, "Javascript") as JwtPayload
            req.user = userId

            const user = await client.user.findUnique({
                where: { id: userId.id }
            })

            if (!user) {
                return res.status(400).send({
                    success: false,
                    message: "Bunday admin mavjud emas!"
                })
            }

            if (user.role !== requiredRole) {
                return res.status(400).send({
                    success: false,
                    message: "Siz admin emassiz!"
                })
            }
            next()
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
}
