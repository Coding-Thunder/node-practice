import mongoose from "mongoose";

const ChatRoomSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    members: { type: Array, require: true },
  },
  {
    timestamps: true,
  }
);

export const RoomModel = mongoose.model("Rooms", ChatRoomSchema);
