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
  }
});

export const dbInitialized = AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

export const query = async (queryString: string, parameters?: any[]) => {
  const start = Date.now();
  if(!AppDataSource.isInitialized) {
    await dbInitialized;
  }
  try {
  const result = await AppDataSource.query(queryString, parameters);
  const duration = Date.now() - start;
  console.log("Executed query:", { queryString, duration, parameters });
  return result;
  } catch (error) {
    const duration = Date.now() - start;
    console.error("Error executing query:", { queryString, duration, parameters, error });
    throw error;
  }
}