import express from "express";
import { deleteUser, getUserById, getUsers, updateUser } from "../controllers/adminControllers.js";
import { verifyToken, verifyAdmin } from '../middlewares/auth.js'

const router = express.Router();

router.get('/users', verifyToken, verifyAdmin, getUsers)

router.get('/user/:id', verifyToken, verifyAdmin, getUserById)

router.put('/user/:id', verifyToken, verifyAdmin, updateUser)

router.delete('/user/:id', verifyToken, verifyAdmin, deleteUser)



export default router;