import express from "express";
import { getCourtbyID, getAllCourts, deleteCourt } from "../controllers/courtControllers.js";

const router = express.Router();

router.get('/', getAllCourts)

router.get('/:id', getCourtbyID)

router.delete('/:id', deleteCourt)

export default router;