import mongoose from "mongoose";
import { dataInit } from "./upload.js";

import "dotenv-defaults/config.js";

async function connect() {
  // TODO 1.1 Connect your MongoDB
  // console.log("connectting to mongo db");
  await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
  .then(async(res) => {
      console.log("mongo db connection created");
  });
  dataInit();
}

export default { connect };