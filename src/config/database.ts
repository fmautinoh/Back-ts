import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const Db_URI = process.env.DB_URI;

if (!Db_URI) {
  throw new Error("Database URI not provided in environment variables");
}

const sequelize = new Sequelize(Db_URI, {
  dialect: "postgres",
  logging: false, // Desactivar el registro de Sequelize en la consola
});

export default sequelize;
