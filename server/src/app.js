
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import session from 'express-session';

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: "GET, POST, PUT, DELETE, PATHCH, HEAD",
    credentials: true
}));

app.use(express.json({limit: "16kb"}))

app.use(express.urlencoded({extended:true, limit:"16kb"}))

app.use(cookieParser())


app.use(session({
    secret: 'your-very-secure-secret',
    resave: false,
    saveUninitialized: true
}));

import userRouter from "./routes/user.routes.js"
import formsAdminRouter from "./routes/formsAdmin.routes.js";
import AdminRouter from "./routes/admin.routes.js";
import subAdminRouter from "./routes/subAdmin.routes.js";
import QualityStaffRouter from "./routes/qualityStaff.routes.js";
import feedingStaffRouter from "./routes/feedingStaff.js";

app.use("/api/v1/users", userRouter)
app.use("/api/v1/formsAdmin", formsAdminRouter)
app.use("/api/v1/admin", AdminRouter)
app.use("/api/v1/subAdmin", subAdminRouter)
app.use("/api/v1/qualityStaff", QualityStaffRouter)
app.use("/api/v1/feedingStaff", feedingStaffRouter)

export {app};
