import { Router } from "express";
import {register, login, refreshSession, logout} from "../controllers/userController";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/refresh-session', verifyToken, refreshSession);
router.post('/logout', verifyToken, logout);

export default router;