import express, { request, response } from "express";
import {PORT, MongoDBURL} from "./config.js";
import mongoose from "mongoose";
import caseRoutes from "./routes/caseRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use('/case', caseRoutes);

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



