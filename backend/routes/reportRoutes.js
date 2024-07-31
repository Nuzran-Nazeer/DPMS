import express from "express";
import { createReport, getAllReports, getReportbyID, deleteReport } from "../controllers/reportControllers.js";

const router = express.Router();

router.post('/create-report', createReport)

router.get('/:id', getReportbyID)

router.get('/', getAllReports)

router.delete('/delete/:id', deleteReport)

export default router;