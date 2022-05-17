const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { logger } = require("./config/logger.js");
const { AppError } = require("./helpers/responseHandler.js");
const { dbConnect } = require("./connections/database.js");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const nftRoutes = require("./routes/getNft.js");

app.use("/lazyApi/", nftRoutes);

const port = process.env.port || 3000;
app.listen(port, () => {
 logger.info(`Connected to port ${port}`);
});
