import { SportsController } from "@controllers";
import { verifyRole } from "@middlewares";
import { Router } from "express";

let sportsRouter: Router = Router()

sportsRouter
        .get("/get-all", SportsController.getAll)
        .post("/get-by-id/:id", SportsController.getById)
        .post("/create", verifyRole("admin"), SportsController.create)
        .patch("/update/:id", verifyRole("admin") , SportsController.update)
        .delete("/delete/:id", verifyRole("admin"), SportsController.delete)
        .get("/:query", SportsController.search)

export default sportsRouter