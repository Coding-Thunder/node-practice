import mongoose from "mongoose";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
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

UserSchema.methods.generateJwtToken = function () {
  return jwt.sign({ user: this._id.toString() }, "chatroom");
};

UserSchema.statics.findByEmail = async (email) => {
  const checkUserByEmail = await UserModel.findOne({ email });
  if (checkUserByEmail) {
    throw new Error("User Already Exists");
  }
  return false;
};

UserSchema.statics.findByEmailAndPassword = async (email, password) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User doest not exists");
  const doesPasswordMatch = await bcrypt.compare(password, user.password);
  if (!doesPasswordMatch) throw new Error("Invalid Password");
  return user;
};
UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(8, (error, salt) => {
    if (error) return next(error);
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);
      user.password = hash;
      return next();
    });
  });
});
export const UserModel = mongoose.model("Users", UserSchema);
