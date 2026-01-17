import { ErrorHandler } from "@errors"
// database querylarni optimallashtirish
import { PrismaClient } from "@prisma/client";
// API hujjatlarini qo'shish
import { NextFunction, Request, Response } from "express";
import { googlePassport } from "@config";
import { sign } from "jsonwebtoken";

// type error tuzatildi
let client = new PrismaClient()
// kod formatlash va tozalash
let token: string
// bundle size optimallashtirildi
// kod strukturasini yaxshilash
// API endpoints qo'shildi

export class authGoogleController {
  static getLoginPage(req: Request, res: Response, next: NextFunction) {
    try {
      res.render("login")
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status))
    }
  }

  static getAuthGoogle(req: Request, res: Response, next: NextFunction) {
    googlePassport.authenticate("google", {
      scope: ["profile", "email"],
    })(req, res, next)
  }

  static async getAuthGoogleCallback(req: Request, res: Response, next: NextFunction) {
    googlePassport.authenticate(
      "google",
      { failureRedirect: "/" },
      async (error: any, profile: any, info: any) => {
        if (error) {
          return next(new ErrorHandler(error.message, error.status))
        }
        if (!profile) {
          return res.redirect("/auth/login")
        }

        try {
          let email = profile.emails[0].value
          let displayName = profile.displayName
          let photo =  profile.photos ? profile.photos[0].value : null
          let user = await client.user.findFirst({
            where: { email }
          })

          if (!user) {
            user = await client.user.create({
              data: {
                email,
                displayname: displayName,
                photo
              }
            })
          }

          req.logIn(user, (err) => {
            if (err) {
              return next(new ErrorHandler(err.message, err.status))
            }
            let accessToken = sign({ id: user.id }, "Javascript", { expiresIn: 2000 })
            let refreshToken = sign({ id: user.id }, "Javascript")
            token = accessToken
            res.redirect("/auth/get/user/page")
          })
        } catch (error: any) {
          return next(new ErrorHandler(error.message, error.status))
        }
      }
    )(req, res, next)
  }

  static async getUserPage(req: Request, res: Response, next: NextFunction) {
    try {
      let userVerification = req.user as any
      let user = await client.user.findFirst({
        where: {
          email: userVerification.email,
        },
      })

      res.render("userPage", {user, token})
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status))
    }
  }
}
