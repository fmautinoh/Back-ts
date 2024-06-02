import { Request, Response } from "express";
import { handleHttpData } from "../utils/error.handle";
import UserService from "../services/usuario.service";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.handle";

const login = async (req: Request, res: Response) => {
  try {
    const { body } = req; // Destructure the body from the req object
    const hashedPassword = await bcrypt.hash(
      body.pasword,
      "$2a$10$WGWGm2lrQC..RZ9RRsynhO"
    );
    const Uservice = await UserService.login_auth(
      body.username,
      hashedPassword
    );

    if (!Uservice || !Uservice.pasword) {
      return res.status(400).send({ error: "Error en Usuario o Contraseña" });
    }

    if (!body.pasword || !Uservice.pasword) {
      return res.status(400).send({ error: "Error en Usuario o Contraseña" });
    }
    const passwordMatch = await bcrypt.compare(body.pasword, Uservice?.pasword);

    if (passwordMatch) {
      const token = generateToken(Uservice.username);
      const data = {
        token,
        user: Uservice.username,
      };
      const respuesta = {
        username: Uservice.username,
        cargo: Uservice.id_car,
        token
      };
      res.send(respuesta);
    } else {
      res.status(400).send({ error: "Error en Usuario o Contraseña" });
    }
  } catch (error) {
    if (error instanceof Error) {
      handleHttpData(res, error.message);
    } else {
      handleHttpData(res, "An unknown error occurred");
    }
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const uServiceGet = await UserService.getAllUsers();
    // Do something with uServiceGet if needed
    res.status(200).json(uServiceGet);
  } catch (error) {
    if (error instanceof Error) {
      handleHttpData(res, error.message);
    } else {
      handleHttpData(res, "An unknown error occurred");
    }
  }
};

export { login, getUser };
