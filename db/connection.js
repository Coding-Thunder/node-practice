import mongoose from "mongoose";

export default async () => {
  mongoose.set("strictQuery", false);

  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
