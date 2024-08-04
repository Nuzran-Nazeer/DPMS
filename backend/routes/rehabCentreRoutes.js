import express from "express";
import { getRehabCentrebyID, getAllRehabCentres, deleteRehabCentre } from "../controllers/rehabCentreControllers.js";

const router = express.Router();

router.get('/', getAllRehabCentres)

router.get('/:id', getRehabCentrebyID)

router.delete('/:id', deleteRehabCentre)

export default router;