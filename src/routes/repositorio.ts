import { Request, Response, Router } from "express";
import { checkJwt } from "../middleware/session";

const router = Router();

router.get("/", checkJwt, (req: Request, res: Response) => {
  res.send({ data: "Dato Repositorio" });
});

export { router };
