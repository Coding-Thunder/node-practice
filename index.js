require("dotenv").config();
import express from "express";
import _routers from "./services/exports";
import helmet from "helmet";
import cors from "cors";

import connectDB from "./db/connection";
const __PORT__ = 5000;

const app = express();
app.use(cors());
app.use(helmet());

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    return res.status(200).json({ message: "Server Running Successfully" });
  } catch ({ message }) {
    return res.status(500).json({
      error: message,
    });
  }
});

app.use("/auth", _routers.auth);

app.listen(__PORT__, () => {
  connectDB()
    .then(() => {
      console.log(`Now listening on port ${__PORT__}\nDatabase Connected`);
    })
    .catch((error) => {
      console.log("ERRR!!!", error.message);
    });
});
