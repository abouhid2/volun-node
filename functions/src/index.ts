import * as functions from "firebase-functions/v2";
import { Pool } from "pg";

export const api = functions.https.onRequest(async (req, res) => {
  try {
    // Get password secret
    const dbPassword = await functions.config().secrets.get("VOLUN_PRODUCTION");

    const pool = new Pool({
      user: "alex_admin",
      host: "localhost", // replace with your DB host if remote
      database: "volun_production",
      password: dbPassword,
      port: 5432,
    });

    const result = await pool.query("SELECT NOW()");
    res.json({ now: result.rows[0].now });
  } catch (error) {
    console.error("DB connection error:", error);
    res.status(500).send("Database connection failed");
  }
});
