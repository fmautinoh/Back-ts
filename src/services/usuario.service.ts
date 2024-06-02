import Usuario from "../models/Usuario.model";
import { IUsuario } from "../interfaces/Usuario.interface";
import { handleDBError } from "../utils/error.handle";

class UserService {
  static async createUser(
    username: string,
    pasword: string,
    dni: number,
    id_car: number
  ): Promise<IUsuario> {
    try {
      const usuario = await Usuario.create({ username, pasword, dni, id_car });
      return usuario;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error creating user: " + error.message);
      }
      throw new Error("Unknown error creating user");
    }
  }

  static async getAllUsers(): Promise<IUsuario[]> {
    try {
      const usuarios = await Usuario.findAll();
      return usuarios;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error getting users: " + error.message);
      }
      throw new Error("Unknown error getting users");
    }
  }

  static async getUserById(id: number): Promise<IUsuario | null> {
    try {
      const usuario = await Usuario.findByPk(id);
      return usuario;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error getting user: " + error.message);
      }
      throw new Error("Unknown error getting user");
    }
  }

  static async login_auth(
    username: string,
    password: string
  ): Promise<IUsuario | null> {
    try {
      const usuario = await Usuario.findOne({ where: { username:username, pasword: password } });
      return usuario;
    } catch (error) {
      if (error instanceof Error) {
        const formattedError = handleDBError(error);
        throw new Error(formattedError.error);
      }
      throw new Error("Unknown error getting user by username and password");
    }
  }

  static async updateUser(
    id: number,
    newData: Partial<IUsuario>
  ): Promise<IUsuario | null> {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        throw new Error("User not found");
      }
      await usuario.update(newData);
      return usuario;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error updating user: " + error.message);
      }
      throw new Error("Unknown error updating user");
    }
  }

  static async deleteUser(id: number): Promise<boolean> {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        throw new Error("User not found");
      }
      await usuario.destroy();
      return true; // Indicar que se ha eliminado correctamente
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error deleting user: " + error.message);
      }
      throw new Error("Unknown error deleting user");
    }
  }
}

export default UserService;
