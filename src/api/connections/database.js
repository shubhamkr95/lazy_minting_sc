require("dotenv").config({ path: "./../../../.env" });

const mongoose = require("mongoose");
const { logger } = require("../config/logger.js");

// const DB = process.env.DB_URL.replace(
//  "<PASSWORD>",
//  process.env.DATABASE_PASSWORD
// );

const DB = process.env.DB_LOCAL;

const dbConnect = mongoose
 .connect(DB)
 .then(() => logger.info("DB connection successful!"));

module.exports = { dbConnect };
