import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration
// const corsOptions = {
//     // CORS_ORIGIN=,http://localhost:3000

//     origin: ["https://form-management-portal-whgo.vercel.app"],
//     // origin: process.env.CORS_ORIGIN,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
//     // allowedHeaders: ["Content-Type"],
//     credentials: true
// };

app.use(cors(
    {
      
    
        origin: ["https://form-management-portal-whgo.vercel.app"],
        // origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }

));

// Handle preflight OPTIONS requests
// app.options('*', cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use(session({
    secret: 'your-very-secure-secret',
    resave: false,
    saveUninitialized: true
}));

// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname, '..', 'Public')));

// Your API routes here
import userRouter from './routes/user.routes.js';
import formsAdminRouter from './routes/formsAdmin.routes.js';
import adminRouter from './routes/admin.routes.js';
import subAdminRouter from './routes/subAdmin.routes.js';
import qualityStaffRouter from './routes/qualityStaff.routes.js';
// import feedingStaffRouter from './routes/feedingStaff.routes.js';
import feedingStaffRouter from './routes/feedingStaff.js'
app.use("/api/v1/users", userRouter);
app.use("/api/v1/formsAdmin", formsAdminRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/subAdmin", subAdminRouter);
app.use("/api/v1/qualityStaff", qualityStaffRouter);
app.use("/api/v1/feedingStaff", feedingStaffRouter);

export { app };
