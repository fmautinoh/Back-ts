import { Router } from "express";
import {
  createDocController,
  updateDocController,
  deleteDocController,
  getDocByIdController,
  getAllDocsController,
  Pagination,
  getDocFileController,
} from "../controllers/Documento.controller";
import { checkJwt } from "../middleware/session";
import multerMiddleware from "../middleware/multerMiddleware";
import { logMiddleware } from "../middleware/log";

const router = Router();

router.post(
  "/",
  multerMiddleware.single("pathDoc"),
  checkJwt,
  logMiddleware,
  createDocController
);
router.patch(
  "/documento/:id",
  multerMiddleware.single("pathDoc"),
  checkJwt,
  logMiddleware,
  updateDocController
);
router.delete("/documento/:id", checkJwt, logMiddleware, deleteDocController);
router.get("/documento/:id", checkJwt, logMiddleware, getDocByIdController);
//router.get("/", checkJwt, getAllDocsController);
router.get("/documentos-paginated", checkJwt, logMiddleware, Pagination);
router.get(
  "/documento/file/:id",
  checkJwt,
  logMiddleware,
  getDocFileController
);

router.delete("/documento/:id", checkJwt, logMiddleware, deleteDocController);
///documentos-paginated?page=1
export default router;
