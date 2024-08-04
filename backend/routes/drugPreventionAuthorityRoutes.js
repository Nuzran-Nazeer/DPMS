import express from "express";
import { getDrugPreventionAuthoritybyID, getAllDrugPreventionAuthorities, deleteDrugPreventionAuthority } from "../controllers/drugPreventionAuthorityControllers.js";

const router = express.Router();

router.get('/', getAllDrugPreventionAuthorities)

router.get('/:id', getDrugPreventionAuthoritybyID)

router.delete('/:id', deleteDrugPreventionAuthority)


export default router;