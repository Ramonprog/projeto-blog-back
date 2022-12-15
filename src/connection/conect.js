import knex from "knex";
import dotenv from "dotenv";
dotenv.config();

import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "devblog",
});
