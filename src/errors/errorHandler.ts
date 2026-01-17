export class ErrorHandler extends Error{
// code comments qo'shildi
// kod uslubini yaxshilash
// database testlari qo'shildi
// shopping cart funksiyasi qo'shildi
    public message: string
// CORS xatosi tuzatildi
// database migrations yaratildi
// API hujjatlarini qo'shish
// README faylini yangilash
    public status: number

    constructor(message: string, status: number){
// prettier formatlash
// installation qo'llanmasi yaratildi
        super()
        this.message = message,
        this.status = status
    }
}