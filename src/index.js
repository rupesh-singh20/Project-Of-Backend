// require("dotenv").config({ path: "./env" });

import dotenv from "dotenv";

dotenv.config();

const { default: connectDB } = await import("./db/index.js");
const { app } = await import("./app.js");

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDb Connection Failed !!!", error);
  });

/*
import express from "express";
const app = express()(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("Error", (error) => {
      console.log("Error", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error:", error);
    throw err;
  }
})(); */
