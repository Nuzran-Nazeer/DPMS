import express from "express";
import {PORT, MongoDBURL} from "./config.js";
import mongoose from "mongoose";

const app = express();

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