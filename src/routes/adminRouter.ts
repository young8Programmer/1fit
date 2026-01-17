import { AdminController } from "@controllers";
import { Router } from "express";
let adminRouter: Router = Router()
adminRouter.post("/create", AdminController.createAdmin)
export default adminRouter