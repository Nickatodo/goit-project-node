const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const connectDB = require("./db/config");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

//Configuracion Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

const appRouter = require("./routes/api/router");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", appRouter);

app.get("/", (req, res, next) => {
  res.send("<h1>GoIT Proyect Node</h1>");
});

//Swagger
const swaggerFilePath = path.join(__dirname, "swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, "utf8"));

const swaggerOptions = {
  swaggerDefinition: swaggerDocument,
  apis: [
    "./routes/api/router.js",
    "./controllers/dailyRateControllers/dailyRate.js",
  ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
