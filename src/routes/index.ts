import { Router } from "express";
import authRouter from "./authRouter";
import adminRouter from "./adminRouter";
import userRouter from "./userRouter";
import gymsRouter from "./gymsRouter";
import sportsRouter from "./sportsRouter";

let router: Router = Router()

router.use("/auth", authRouter)
router.use("/users", userRouter)
router.use("/gyms", gymsRouter)
router.use("/sports", sportsRouter)
router.use("/admin", adminRouter)

export default router