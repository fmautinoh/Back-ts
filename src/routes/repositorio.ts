import { Router } from "express";
import {
  createDocController,
  updateDocController,
  deleteDocController,
  getDocByIdController,
  getAllDocsController,
} from "../controllers/Documento.controller";
import { checkJwt } from "../middleware/session";
import multerMiddleware from "../middleware/multerMiddleware";

const router = Router();

router.post(
  "/",
  multerMiddleware.single("file"),
  checkJwt,
  createDocController
);
router.put(
  "/documento/:id",
  multerMiddleware.single("file"),
  checkJwt,
  updateDocController
);
router.delete("/documento/:id", checkJwt, deleteDocController);
router.get("/documento/:id", checkJwt, getDocByIdController);
router.get("/", checkJwt, getAllDocsController);

export default router;
