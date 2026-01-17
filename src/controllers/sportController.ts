// package.json yangilandi
// bundle size optimallashtirildi
// image optimization qo'shildi
// unit testlar qo'shildi
import { Request, Response, NextFunction } from "express";
// image optimization qo'shildi
import { ErrorHandler } from "@errors";
import { PrismaClient } from "@prisma/client";

let client = new PrismaClient()

export class SportsController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            let sports = await client.sport.findMany({
                include: {
                    gyms: {
                        select:{
                            gym: true
                        }
                    }
                }
            })

            res.send({ 
                success: true, 
                data: sports 
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        let { id } = req.params
        try {
            let sport = await client.sport.findUnique({
                where: { id: Number(id) },
                include: {
                    gyms: {
                        select: {
                            gym: true
                        }
                    }
                }
            })

            if (!sport) {
                return res.status(404).send({ 
                    success: false, 
                    message: "Sport mavjud emas" 
                })
            }

            res.send({ 
                success: true, 
                data: sport 
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        let { name } = req.body
        try {
            if (!name) {
                return res.status(400).send({
                    success: false,
                    message: "Sport nomini kiriting"
                })
            }

            const verifySport = await client.sport.findFirst({
                where: { name }
            })

            if (verifySport) {
                return res.status(400).send({
                    success: false,
                    message: "Bunday sport mavjud"
                })
            }

            let newSport = await client.sport.create({
                data: { name }
            })

            res.send({ 
                success: true, 
                data: newSport 
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        let { id } = req.params
        let { name } = req.body
        try {
            if (!name) {
                return res.status(400).send({
                    success: false,
                    message: "Sport nomini kiriting"
                })
            }

            let verifySport = await client.sport.findUnique({
                where: { id: Number(id) }
            })

            if (!verifySport) {
                return res.status(404).send({
                    success: false,
                    message: "Sport topilmadi"
                })
            }

            let updatedSport = await client.sport.update({
                where: { id: Number(id) },
                data: { name }
            })

            res.send({ 
                success: true, 
                data: updatedSport 
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        let { id } = req.params
        try {
            let verifySport = await client.sport.findUnique({
                where: { id: Number(id) }
            })

            if (!verifySport) {
                return res.status(404).send({
                    success: false,
                    message: "Sport topilmadi"
                })
            }

            await client.sport.delete({
                where: { id: Number(id) }
            })

            res.send({ 
                success: true, 
                message: "Sport o'chirildi" 
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async search(req: Request, res: Response, next: NextFunction) {
        let { query } = req.query
        if (!query) {
            return res.status(400).send({
                success: false,
                message: "Qidirish so'rovi mavjud emas"
            })
        }
        try {
            let sports = await client.sport.findMany({
                where: {
                    name: {
                        contains: query as string,
                        mode: 'insensitive'
                    }
                },
                include: {
                    gyms: {
                        include: {
                            gym: true
                        }
                    }
                }
            })

            res.send({ 
                success: true, 
                data: sports 
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
}
