import { sign, verify, JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "token.01010101";

const generateToken = (username: string, id_car: number) => {
  const jwt = sign({ username, id_car }, JWT_SECRET, {
    expiresIn: "3h",
  });
  return jwt;
};

const verifyToken = (jwt: string): JwtPayload | null => {
  try {
    return verify(jwt, JWT_SECRET) as JwtPayload;
  } catch (e) {
    return null;
  }
};

export { generateToken, verifyToken };
