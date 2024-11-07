import { userController } from "@controllers";
import { Router } from "express";

let userRouter: Router = Router()

userRouter
        .get("/get-me", userController.getMe)

export default userRouter