import { NextFunction, Response } from "express";
import { RequestExt } from "../interfaces/req-ext";
import { verifyToken } from "../utils/jwt.handle";

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop();
    const isUser = verifyToken(`${jwt}`) as {
      username: string;
      id_car: number;
    };
    if (!isUser) {
      res.status(401).send("NO_TIENES_UNA_SESIÓN_VALIDA");
    } else {
      req.user = isUser;
      next();
    }
  } catch (e) {
    console.log({ e });
    res.status(400).send("SESSION_NO_VALIDAD");
  }
};

export { checkJwt };
