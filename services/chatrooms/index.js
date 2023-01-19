import { Router as ExpressRouter } from "express";
import { RoomModel } from "../../db/chatroom";

const Router = ExpressRouter();

Router.get("/", async (req, res) => {
  try {
    return res.status(200).json({ message: "worked" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

Router.post("/create", async (req, res) => {
  try {
    const { name, members } = req.body;
    const roomExists = await RoomModel.findOne({ name });
    if (roomExists) throw new Error("Room Already Exists");
    await RoomModel.create({ name, members });
    return res.status(200).json({ message: "worked" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default Router;
