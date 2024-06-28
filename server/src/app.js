import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';


const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use(session({
    secret: 'your-very-secure-secret',
    resave: false,
    saveUninitialized: true
}));

// Your API routes here
import userRouter from './routes/user.routes.js';
import formsAdminRouter from './routes/formsAdmin.routes.js';
import adminRouter from './routes/admin.routes.js';
import subAdminRouter from './routes/subAdmin.routes.js';
import qualityStaffRouter from './routes/qualityStaff.routes.js';
import feedingStaffRouter from './routes/feedingStaff.js';

app.use("/api/v1/users", userRouter);
app.use("/api/v1/formsAdmin", formsAdminRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/subAdmin", subAdminRouter);
app.use("/api/v1/qualityStaff", qualityStaffRouter);
app.use("/api/v1/feedingStaff", feedingStaffRouter);

export { app };
