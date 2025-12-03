import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  poolSize: 20,
  extra: {
    idileTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
  entities: ["src/entity/*.js"],
});

export const dbInitialized = AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });