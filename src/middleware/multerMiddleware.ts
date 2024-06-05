import { Request } from "express";
import multer, { diskStorage } from "multer";

const PATH_STORAGE = `${process.cwd()}/storage`;

const storage = diskStorage({
  destination(req: Request, file: Express.Multer.File, cb: any) {
    cb(null, PATH_STORAGE);
  },
  filename(req: Request, file: Express.Multer.File, cb: any) {
    cb(null, file.originalname); // Guardar con el mismo nombre y extensión del archivo original
  },
});

const multerMiddleware = multer({ storage });

export default multerMiddleware;
