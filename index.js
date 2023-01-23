require("dotenv").config();
import express from "express";
import _routers from "./services/exports";
import helmet from "helmet";
import cors from "cors";
import socket from "socket.io";
import http from "http";

import connectDB from "./db/connection";
const __PORT__ = 5000;

const app = express();
app.use(cors());
app.use(helmet());

app.use(express.json());

const server = http.Server(app);
const io = socket(server);

app.use("/auth", _routers.auth);
app.use("/rooms", _routers.chatroom);

app.get("/", async (req, res) => {
  try {
    return res.status(200).json({ message: "Server Running Successfully" });
  } catch ({ message }) {
    return res.status(500).json({
      error: message,
    });
  }
});

io.on("connection", function (socket) {
  console.log("Made socket connection");
});

server.listen(__PORT__, () => {
  connectDB()
    .then(() => {
      console.log(`Now listening on port ${__PORT__}\nDatabase Connected`);
    })
    .catch((error) => {
      console.log("ERRR!!!", error.message);
    });
});
