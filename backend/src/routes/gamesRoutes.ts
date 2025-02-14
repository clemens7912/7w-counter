import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { createPlayer, deletePlayer, getAllPlayers, getAllWonders, getGamesPlayedByPlayer, saveGame } from "../controllers/gamesController";

const router = Router();

router.post('/player', verifyToken, createPlayer);
router.get('/player', verifyToken, getAllPlayers);
router.delete('/player/:id', deletePlayer);

router.get('/wonder', getAllWonders);

router.post('/', verifyToken, saveGame);

router.get('/data', verifyToken, getGamesPlayedByPlayer);

export default router;