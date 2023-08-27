import mongoose from "mongoose";
// import ENV from "../config.js";

import { MongoMemoryServer } from "mongodb-memory-server";

export default async function connect() {
  const mongod = await MongoMemoryServer.create();
  const getUri = mongod.getUri();

  mongoose.set("strictQuery", true);

  // if you want to connect to mongodb database than comment this line out
  const db = await mongoose.connect(getUri);
  // if you want to connect to database than comment this out and save you mongodb url in .env file
  // const db = await mongoose.connect(ENV.ATLAS_URI);
  console.log("Database connected 🚀🚀🚀");
  return db;
}
