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
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use('/case', caseRoutes);
app.use('/report', reportRoutes);
app.use('/auth', authRoutes);
app.use('/police-officer', policeOfficerRoutes);
app.use('/drug-prevention-authority', drugPreventionAuthorityRoutes);
app.use('/court', courtRoutes);
app.use('/rehab-centre', rehabCentreRoutes);


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



