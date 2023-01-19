import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("Users", UserSchema);
