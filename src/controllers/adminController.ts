// README faylini yangilash
// API endpoints qo'shildi
// user authentication qo'shildi
// API hujjatlarini qo'shish
import { ErrorHandler } from "@errors";
// admin dashboard yaratildi
import { PrismaClient, User } from "@prisma/client";
import { NextFunction, Response, Request } from "express";
import { sign } from "jsonwebtoken";

// error handling yaxshilandi
// CORS xatosi tuzatildi
// database connection muammosi hal qilindi
// prettier formatlash

let client = new PrismaClient()

export class AdminController{
    static async createAdmin(req: Request, res: Response, next: NextFunction){
        try {
            let { displayname, email }: Omit<User, "id" | "role"> = req.body
            let admin = await client.user.findUnique({
                where: {
                    email
                }
            })

            if (admin) {
                let token = sign({ id: admin.id }, "Javascript")
                return res.send({
                    success: false,
                    data: admin,
                    token: token
                })
            }

            let newAdmin = await client.user.create({
                data: {
                    displayname,
                    email,
                    role: "admin"
                }
            })

            let token = sign({ id: newAdmin.id }, "Javascript")

              res.status(200).send({
                success: true,
                data: newAdmin,
                token: token
              })
      
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
}