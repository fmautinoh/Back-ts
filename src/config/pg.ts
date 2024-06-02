import "dotenv/config";
import { Pool } from "pg";

const Db_URI = process.env.DB_URI;

if (!Db_URI) {
  throw new Error("Database URI not provided in environment variables");
}

const pool = new Pool({
  connectionString: Db_URI,
});

pool.on("connect", () => {
  console.log("Connected to the database successfully!");
});

pool.on("error", (err) => {
  console.error("Failed to connect to the database", err);
  // Depending on your error handling strategy, you might want to process.exit(1);
});

export default pool;
