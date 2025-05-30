"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const functions = __importStar(require("firebase-functions/v2"));
const pg_1 = require("pg");
exports.api = functions.https.onRequest(async (req, res) => {
    try {
        // Get password secret
        const dbPassword = await functions.config().secrets.get("VOLUN_PRODUCTION");
        const pool = new pg_1.Pool({
            user: "alex_admin",
            host: "localhost",
            database: "volun_production",
            password: dbPassword,
            port: 5432,
        });
        const result = await pool.query("SELECT NOW()");
        res.json({ now: result.rows[0].now });
    }
    catch (error) {
        console.error("DB connection error:", error);
        res.status(500).send("Database connection failed");
    }
});
