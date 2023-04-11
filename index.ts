const express = require("express");
import "reflect-metadata";
import { createConnection } from "typeorm";
import { router } from "./backend/src/routes/routes";
import { frontendRouter } from "./frontend/src/routes/route";
import bodyParser from "body-parser";
import path from "path";
import paypal from "paypal-rest-sdk";

// import expressValidator from "express-validator";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser());
// app.use(expressValidator());
app.use(express.static(path.join(__dirname,"backend/src")))
app.set("views", path.join(__dirname, "frontend/src/views"));
app.set("view engine", "ejs");
app.use("/api/v1", router);
app.use("/", frontendRouter);

createConnection().then(() => {
  console.log("successfully connected with database using typeorm");
});

app.listen(2020);
