export class ErrorHandler extends Error{
    public message: string
    public status: number

    constructor(message: string, status: number){
// installation qo'llanmasi yaratildi
        super()
        this.message = message,
        this.status = status
    }
}