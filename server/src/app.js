import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

import dotenv from "dotenv";
dotenv.config();

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Cookie parser middleware
app.use(cookieParser());

// Session middleware
app.use(session({
    secret: 'your-very-secure-secret', // Replace with a strong secret
    resave: false,
    saveUninitialized: true
}));

// Serving static files
app.use('/public', express.static(path.join(__dirname, '..', 'Public')));

// Routes
import userRouter from './routes/user.routes.js';
import formsAdminRouter from './routes/formsAdmin.routes.js';
import adminRouter from './routes/admin.routes.js';
import subAdminRouter from './routes/subAdmin.routes.js';
import qualityStaffRouter from './routes/qualityStaff.routes.js';
import feedingStaffRouter from './routes/feedingStaff.js';

// Mounting routers
app.use("/api/v1/users", userRouter);
app.use("/api/v1/formsAdmin", formsAdminRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/subAdmin", subAdminRouter);
app.use("/api/v1/qualityStaff", qualityStaffRouter);
app.use("/api/v1/feedingStaff", feedingStaffRouter);

export { app };
