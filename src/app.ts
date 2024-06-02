import express from "express";
import cors from "cors";
import { router } from "./routes";
import sequelize from "./config/database"; // Importa la instancia de Sequelize

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

// Establecer conexión con la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to database established");
    app.listen(PORT, () => {
      console.log(`Server ready at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Terminar el proceso con un código de salida no exitoso
  });
