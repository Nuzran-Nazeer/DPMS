import express from "express";
import { deleteUser, getUserById, getUsers, updateUser } from "../controllers/userControllers.js";
import { verifyToken, verifyAdmin } from '../middlewares/auth.js'

const router = express.Router(); /*Creating a new router instance*/

/* USER MANAGEMENT */

/*Route to get all users*/
router.get('/', verifyToken, verifyAdmin, getUsers) /*Verify token and admin role, then retrieve users*/

/*Route to get a user by ID*/
router.get('/:id', verifyToken, verifyAdmin, getUserById) /*Verify token and admin role, then retrieve a user by ID*/

/*Route to update a user by ID*/
router.put('/:id', verifyToken, verifyAdmin, updateUser) /*Verify token and admin role, then update a user by ID*/

/*Route to delete a user by ID*/
router.delete('/:id', verifyToken, verifyAdmin, deleteUser) /*Verify token and admin role, then delete a user by ID*/



export default router;