import { GymsController } from "@controllers";
import { verifyRole } from "@middlewares";
import { Router } from "express";

let gymsRouter: Router = Router()

gymsRouter
        .get("/get-all", GymsController.getAllGyms)
        .post("/get-by-id/:id", GymsController.getGymById)
        .post("/create", verifyRole("admin"), GymsController.createGym)
        .patch("/update/:id", verifyRole("admin"), GymsController.updateGym)
        .delete("/delete/:id", verifyRole("admin"), GymsController.deleteGym)
        .get("/:query", GymsController.searchGyms)
        .post("/add-sport",verifyRole("admin"), GymsController.addSport)

export default gymsRouter