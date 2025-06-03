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
import adminRoutes from "./routes/adminRoutes.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

// CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL 
        : 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.use('/case', caseRoutes);
app.use('/report', reportRoutes);
app.use('/auth', authRoutes);
app.use('/police-officer', policeOfficerRoutes);
app.use('/drug-prevention-authority', drugPreventionAuthorityRoutes);
app.use('/court', courtRoutes);
app.use('/rehab-centre', rehabCentreRoutes);
app.use('/admin', adminRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
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



