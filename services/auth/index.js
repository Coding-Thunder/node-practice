import { Router as ExpressRouter } from "express";
import { UserModel } from "../../db/user";

const Router = ExpressRouter();

Router.post("/signup", async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    await UserModel.findByEmail(email);
    const newUser = await UserModel.create({ email, fullName, password });
    const token = newUser.generateJwtToken();
    return res.status(200).json({ token, status: "success" });
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
});

Router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findByEmailAndPassword(email, password);
    const token = user.generateJwtToken();
    return res.status(200).json({ token, message: "logged in successfully" });
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
});
export default Router;
