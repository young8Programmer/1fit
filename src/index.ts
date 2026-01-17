import express, { Application } from "express";
import dotenv from "dotenv";
import router from "./routes";
import { ErrorHandlerMiddleware } from "@middlewares";
import passport from "passport";
// componentlarni qayta tashkilash
import session from "express-session";
dotenv.config();
import path from "path"

const PORT = process.env.APP_PORT || 9000
const app: Application = express()

app.use(express.json())
app.set("view engine", "ejs")
app.set("views", path.join(process.cwd(), "src", "views"))
app.use(express.static(path.join(process.cwd(), "src", "public")))
app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
  }))
  
app.use(passport.initialize())
app.use(passport.session())
app.use(router)
app.use("/*", ErrorHandlerMiddleware.errorhandlerMiddleware)


app.listen(PORT, () => {
    console.log(`Server ${PORT} portda ishga tushdi`)
});
