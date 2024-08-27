import express from "express";
import { createCase, deleteCase, getAllCases, getAllSharedCases, getCasebyID, shareCase, updateCase,getCasesByOfficerHandling } from "../controllers/caseControllers.js";
import { verifyToken, verifyAdmin, verifyAdm_Po_Dpa, verifyAdm_Po, verifyCourt, verifyRC_Court, verifyAllUsers, verifyPO } from '../middlewares/auth.js'

const router = express.Router();

router.post('/create-case', verifyToken, verifyAdm_Po, createCase)

router.get('/', verifyToken, verifyAllUsers, getAllCases)

router.get('/:id', verifyToken, verifyAllUsers, getCasebyID)

router.put('/:id', verifyToken, verifyAdm_Po, updateCase)

router.delete('/:id', verifyToken, verifyAdmin, deleteCase)

router.post('/share/:id', verifyToken, verifyAdm_Po_Dpa, shareCase)

router.get('/sharedcase/:role', verifyToken, verifyRC_Court, getAllSharedCases)

router.get('/policehandler/:officerId', verifyToken, verifyPO, getCasesByOfficerHandling);


export default router;