import express from "express";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";
import baseRouter from "./router";
import { responseStatus } from "./types/enums";
import initializeENV from "./envloader";
initializeENV();
import knex from "./db/knex";
import { Model } from "objection";
Model.knex(knex);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(
  morgan(
    'REQUEST :response-time ms [:date[clf]] ":method :url HTTP/:http-version" :status :user-agent',
    {
      immediate: true,
      skip: (req) => {
        return req.path === "/api/";
      },
    }
  )
);
app.use(
  express.urlencoded({ extended: true, limit: "2mb", parameterLimit: 1e5 })
);

app.use(compression());

app.use("/api/", baseRouter);

app.get("/", (req, res) => {
  return res.status(responseStatus.Ok).send("Server is running");
});
app.listen(PORT, () => {
  console.log("Server is running at port: ", PORT);
});
