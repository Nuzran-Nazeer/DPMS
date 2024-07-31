import express from "express";
import { createCase, getAllCases, getCasebyID, updateCase } from "../controllers/caseControllers.js";

const router = express.Router();

router.post('/create-case', createCase)

router.get('/', getAllCases)

router.get('/:id', getCasebyID)

router.put('/:id', updateCase)

export default router;