// database migrations yaratildi
// database querylarni optimallashtirish
import { NextFunction, Request, Response } from "express";
import { Gym, PrismaClient } from "@prisma/client";
// error handling yaxshilandi
// build konfiguratsiyasi sozlandi
import { ErrorHandler } from "@errors";
// CORS xatosi tuzatildi
// API endpoints qo'shildi
// kod strukturasini yaxshilash

let client = new PrismaClient()

export class GymsController {
    static async getAllGyms(req: Request, res: Response, next: NextFunction) {
        try {
            let gyms: Gym[] = await client.gym.findMany({
                include: {
                    sports: {
                        select: {
                           sport: true
                        }
                    }
                }
            })

            res.send({
                success: true,
                data: gyms 
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async getGymById(req: Request, res: Response, next: NextFunction) {
        let { id } = req.params
        try {
            let verifyGym = await client.gym.findUnique({
                where: { id: Number(id) },
                include: { sports: true }
            })

            if (!verifyGym) {
                return res.status(404).send({
                    success: false, 
                    message: "Malumot yo'q" 
                })
            }

            let gym = await client.gym.findMany({
                where: {
                    id: verifyGym.id
                },

                include: {
                    sports: {
                        select: {
                            sport: true
                        }
                    }
                }
            })

            res.send({ 
                success: true, 
                data: gym 
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async createGym(req: Request, res: Response, next: NextFunction) {
        let { name, location } = req.body
        try {
            const verifyGym = await client.gym.findFirst({
                where: { name }
            })

            if (verifyGym) {
                return res.status(400).send({
                    success: false,
                    message: "Bunday gym mavjud"
                })
            }

            if (!name || !location) {
                return res.status(400).send({
                    success: false,
                    message: "Gym nomini va joylashuvini kiriting"
                })
            }

            let newGym = await client.gym.create({
                data: { name, location }
            })

            res.send({ 
                success: true,
                data: newGym 
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async updateGym(req: Request, res: Response, next: NextFunction) {
        let { id } = req.params
        let { name, location } = req.body
        try {
            let verifyGym = await client.gym.findUnique({
                where: { id: Number(id) }
            })

            if (!verifyGym) {
                return res.status(404).send({
                    success: false,
                    message: "Gym topilmadi"
                })
            }

            if (!name || !location) {
                return res.status(400).send({
                    success: false,
                    message: "gym nomini va joylashuvini kirit"
                })
            }

            let updatedGym = await client.gym.update({
                where: { id: Number(id) },
                data: { name, location }
            })

            res.send({ 
                success: true, 
                data: updatedGym 
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async deleteGym(req: Request, res: Response, next: NextFunction) {
        let { id } = req.params
        try {
            let verifyGym = await client.gym.findUnique({
                where: { id: Number(id) }
            })

            if (!verifyGym) {
                return res.status(404).send({ 
                    success: false, 
                    message: "Bunday gym mavjud emas" 
                })
            }

            await client.gym.delete({
                where: { id: Number(id) }
            })

            res.send({ 
                success: true, 
                message: "Gym o'chirildi" 
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async searchGyms(req: Request, res: Response, next: NextFunction) {
        let { query } = req.query
        try {
            let gyms = await client.gym.findMany({
                where: {
                    name: {
                        contains: query as string,
                        mode: "insensitive"
                    }
                }
            })
            res.send({ 
                success: true, 
                data: gyms 
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async addSport(req: Request, res: Response, next: NextFunction) {
        let { gymId, sportId } = req.body

        try {
            const gym = await client.gym.findUnique({ where: { id: gymId } })
            const sport = await client.sport.findUnique({ where: { id: Number(sportId) } })

            if (!gym) {
                return res.status(404).send({ 
                    success: false, 
                    message: "Gym mavjud emas" 
                })
            }

            if (!sport) {
                return res.status(404).send({ 
                    success: false, 
                    message: "Sport mavjud emas" 
                })
            }

            let updatedGym = await client.gymsOnSports.create({
                data: {
                    gym: { connect: { id: gymId } },
                    sport: { connect: { id: Number(sportId) } }
                }
            })

            res.send({ 
                success: true, 
                data: updatedGym 
            })

        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
}
