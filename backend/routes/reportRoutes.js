import express from "express";
import { createReport, getAllReports, getReportbyID, deleteReport, updateReport } from "../controllers/reportControllers.js";

const router = express.Router();

router.post('/create-report', createReport)

router.put('/:id', updateReport)

router.get('/:id', getReportbyID)

router.get('/', getAllReports)

router.delete('/:id', deleteReport)

export default router;