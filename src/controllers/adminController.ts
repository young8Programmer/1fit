import { ErrorHandler } from "@errors";
import { PrismaClient, User } from "@prisma/client";
import { NextFunction, Response, Request } from "express";
import { sign } from "jsonwebtoken";


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