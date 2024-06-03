import { Request, Response, Router } from "express";
import { login, getUser } from "../controllers/usuario";
import { logMiddleware } from "../middleware/log";
const router = Router();

router.post("/", logMiddleware, login);

router.get("/", logMiddleware, getUser);

export default router;
