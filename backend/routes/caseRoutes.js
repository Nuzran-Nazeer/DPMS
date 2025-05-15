import express from "express"; 
import { createCase, deleteCase, getAllCases, getAllSharedCases, getCasebyID, shareCase, updateCase, getCasesByOfficerHandling } from "../controllers/caseControllers.js";
/* Imports from middleware for authentication and authorization */
import { verifyToken, verifyAdmin, verifyAdm_Po_Dpa, verifyAdm_Po, verifyRC_Court, verifyPO, verifyAllUsers } from '../middlewares/auth.js'

const router = express.Router();

/* CASE MANAGEMENT */

/* Route to create a new case : Accessible only by Admin and Police Officer roles */
   router.post('/create-case', verifyToken, verifyAdm_Po, createCase); /* Verify token and create a new case based on role  */

   /* Route to get all cases : Accessible only by Admin, Police Officer, and Drug Prevention Authority roles */
   router.get('/', verifyToken, verifyAdm_Po_Dpa, getAllCases); /* Verify token and retrieve all cases based on role  */
   
   /* Route to get a specific case by ID : Accessible only by Admin, Police Officer, and Drug Prevention Authority roles
   while Court and RC can access only shared case details */
   router.get('/:id', verifyToken, verifyAllUsers, getCasebyID); /* Verify token and retrieve a case by id based on role  */

   /* Route to update an existing case by ID : Accessible only by Admin and Police Officer roles */
   router.put('/:id', verifyToken, verifyAdm_Po, updateCase); /* Verify token and update a case by id based on role */
   
   /* Route to delete a case by ID : Accessible only by Admin role */
   router.delete('/:id', verifyToken, verifyAdmin, deleteCase); /* Verify token and delete a case by id based on role */
   
   /* Route to share a case : Accessible only by Admin, Police Officer, and Drug Prevention Authority roles */
   router.post('/share/:id', verifyToken, verifyAdm_Po_Dpa, shareCase); /* Verify token and share a case by id based on role */
   
   /* Route to get all shared cases for a specific role : Accessible only by Rehabilitation Centre and Court roles */
   router.get('/sharedcase/:role', verifyToken, verifyRC_Court, getAllSharedCases); /* Verify token and retrieve shared cases based on role */
   
   /* Route to get cases handled by a specific Police Officer : Accessible only by Police Officer role */
   router.get('/policehandler/:officerId', verifyToken, verifyPO, getCasesByOfficerHandling); /* Verify token and retrieve cases handled by a specific police officer */
   
   export default router;