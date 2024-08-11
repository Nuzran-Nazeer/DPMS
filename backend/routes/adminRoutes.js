import express from "express";
import { deleteUser, getUserById, getUsers, updateUser } from "../controllers/adminControllers.js";

const router = express.Router();

router.get('/users', getUsers)

router.get('/user/:id', getUserById)

router.put('/user/:id', updateUser)

router.delete('/user/:id', deleteUser)



export default router;