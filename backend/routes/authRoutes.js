import express from "express";
import { login, registerUser } from "../controllers/authControllers.js";
import { verifyToken } from "../middlewares/auth.js";
import { authLimiter, registerLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

// Apply rate limiting to auth routes
router.post('/register', registerLimiter, registerUser);
router.post('/login', authLimiter, login);

export default router;