import pg from "pg";
require("dotenv").config();
const { Pool } = pg;

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default db;

db.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});
