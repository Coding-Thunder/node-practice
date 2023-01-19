import { Router as ExpressRouter } from "express";
import { UserModel } from "../../db/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Router = ExpressRouter();

Router.post("/signup", async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    const checkUserByEmail = await UserModel.findOne({ email });

    // checking if user already exists
    if (checkUserByEmail) {
      return res.json({ message: "User Already Exists" });
    }

    // hashing password
    const hashSalt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, hashSalt);

    UserModel.create({
      email,
      fullName,
      password: hashedPassword,
    });

    // generating jwt
    const token = jwt.sign({ user: { email, fullName } }, "ChatRoom");
  } catch (error) {}
});

export default Router;
