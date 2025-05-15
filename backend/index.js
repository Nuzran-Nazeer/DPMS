import express from "express";
import {PORT, MongoDBURL} from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import caseRoutes from "./routes/caseRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import policeOfficerRoutes from "./routes/policeOfficerRoutes.js";
import drugPreventionAuthorityRoutes from "./routes/drugPreventionAuthorityRoutes.js";
import rehabCentreRoutes from "./routes/rehabCentreRoutes.js";
import courtRoutes from "./routes/courtRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import { securityHeaders } from "./middlewares/securityHeaders.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Apply security headers
app.use(securityHeaders);

// Apply rate limiting to all routes
app.use(apiLimiter);

app.use(express.json());

// Configure CORS with specific options
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use('/auth/case', caseRoutes);
app.use('/auth/report', reportRoutes);
app.use('/auth', authRoutes);
app.use('/auth/police-officer', policeOfficerRoutes);
app.use('/auth/drug-prevention-authority', drugPreventionAuthorityRoutes);
app.use('/auth/court', courtRoutes);
app.use('/auth/rehab-centre', rehabCentreRoutes);
app.use('/auth/user', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

mongoose
.connect(MongoDBURL)
.then(()=>{
    console.log("App connected to Database");
    app.listen(PORT, ()=>{
        console.log(`App is listening to Port:  ${PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
});



