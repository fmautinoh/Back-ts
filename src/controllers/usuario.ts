import { Request, Response } from "express";
import { handleHttpData } from "../utils/error.handle";
import UserService from "../services/usuario.service";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.handle";

const login = async (req: Request, res: Response) => {
  try {
    const { body } = req; // Destructura el body del objeto req
    const hashedPassword = await bcrypt.hash(
      body.pasword,
      "$2a$10$WGWGm2lrQC..RZ9RRsynhO"
    );
    const usuario = await UserService.login_auth(body.username, hashedPassword);

    if (!usuario) {
      return res.status(400).send({ error: "Error en Usuario o Contraseña" });
    }

    const passwordMatch = await bcrypt.compare(body.pasword, usuario.pasword);

    if (passwordMatch) {
      const token = generateToken(usuario.username, usuario.id_car);
      const respuesta = {
        username: usuario.username,
        cargo: usuario.id_car,
        id_usu: usuario.id_usu,
        token,
      };
      res.send(respuesta);
    } else {
      res.status(400).send({ error: "Error en Usuario o Contraseña" });
    }
  } catch (error) {
    res.status(500).send({ error: "Error interno del servidor" });
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
