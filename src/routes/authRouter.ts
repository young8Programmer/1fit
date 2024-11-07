import { authGoogleController } from "@controllers";
import { Router } from "express";

let authRouter: Router = Router()

authRouter
        .get("/login/page", authGoogleController.getLoginPage)
        .get("/google", authGoogleController.getAuthGoogle)
        .get("/google/callback", authGoogleController.getAuthGoogleCallback)
        .get("/get/user/page", authGoogleController.getUserPage)

export default authRouter