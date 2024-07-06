const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const connectDB = require("./db/config");
require("dotenv").config();

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = require("./utils/options.swagger");
const specs = swaggerJsdoc(options);

const app = express();

const appRouter = require("./routes/api/router");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", appRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res, next) => {
  res.send("<h1>GoIT Proyect Node</h1>");
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
