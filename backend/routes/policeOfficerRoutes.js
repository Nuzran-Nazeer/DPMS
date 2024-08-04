import express from "express";
import { getAllPoliceOfficers, getPoliceOfficerbyID, deletePoliceOfficer } from "../controllers/policeOfficerControllers.js";

const router = express.Router();

router.get('/', getAllPoliceOfficers)

router.get('/:id', getPoliceOfficerbyID)

router.delete('/:id', deletePoliceOfficer)

export default router;