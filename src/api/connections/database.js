const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const { logger } = require("../config/logger.js");

const DB = process.env.DB_URL.replace(
 "<PASSWORD>",
 process.env.DATABASE_PASSWORD
);

const dbConnect = mongoose
 .connect(DB)
 .then(() => logger.info("DB connection successful!"));

export default dbConnect;
