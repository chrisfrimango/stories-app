import { Pool, QueryResult, QueryResultRow } from "pg";
import dotenv from "dotenv";
import { DatabaseConfig, QueryParams } from "../types/database";

dotenv.config();

if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  console.error("Database credentials not provided");
  throw new Error("Database credentials not provided");
}

console.log("Attempting to connect to database:", {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || "5432",
});

const dbConfig: DatabaseConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || "5432"),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

export const pool = new Pool(dbConfig);

export const query = async <T extends QueryResultRow = QueryResultRow>({
  text,
  params,
}: QueryParams): Promise<QueryResult<T>> => {
  const client = await pool.connect();
  console.log("Executing query:", { text, params });

  try {
    await client.query("SET search_path TO blog");
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
};

// Error handling
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

pool.on("connect", () => {
  console.log("Database connected successfully");
});

pool.on("error", (err) => {
  console.error("Database connection error:", err);
});

export default {
  pool,
  query,
};
