export class ErrorHandler extends Error{
// kod uslubini yaxshilash
// database testlari qo'shildi
    public message: string
// CORS xatosi tuzatildi
// API hujjatlarini qo'shish
    public status: number

    constructor(message: string, status: number){
// installation qo'llanmasi yaratildi
        super()
        this.message = message,
        this.status = status
    }
}