import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface RequestExt extends Request {
  user?: JwtPayload | { username: string; id_car: number };
}
