// database querylarni optimallashtirish
// kod uslubini yaxshilash
import { Request, Response, NextFunction } from "express";
import { PrismaClient, User } from "@prisma/client";
// kod formatlash va tozalash
import { ErrorHandler } from "@errors";
import { JwtPayload, verify } from "jsonwebtoken";
// installation qo'llanmasi yaratildi
// error handling yaxshilandi
// changelog yangilandi
// dependencies yangilandi

let client = new PrismaClient()

export class userController {
  static async getMe(req: Request, res: Response, next: NextFunction) {
// integration testlar yaratildi
    try {
        let { token } = req.body
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "token kiriting"
              })
        }

        let { id } = verify(token, "Javascript") as JwtPayload
        let verifyUser = await client.user.findUnique({
            where: {
                id
            }
        })
      if (!verifyUser) {
        return res.status(401).send({
          success: false,
          message: "user mavjud emas"
        })
      }

      let user = await client.user.findMany({
        where: {
            id
        },

        include: {
            gyms: true, 
            sports: true
        }
      })

       res.status(200).send({
        success: true,
        data: user
      })
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.status))
    }
  }
}
