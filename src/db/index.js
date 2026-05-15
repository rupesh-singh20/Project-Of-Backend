import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const buildMongoUri = (uri) => {
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in .env");
  }

  const [base, query] = uri.split("?");
  const urlParts = base.split("//");
  const afterProtocol = urlParts[1] || base;
  const pathParts = afterProtocol.split("/");
  const hasDatabase = pathParts.length > 1 && pathParts[1].length > 0;

  if (hasDatabase) {
    return uri;
  }

  const trimmedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${trimmedBase}/${DB_NAME}${query ? `?${query}` : ""}`;
};

const connectDB = async () => {
  try {
    const uri = buildMongoUri(process.env.MONGODB_URI);
    const connectionInstance = await mongoose.connect(uri);

    console.log(
      `MongoDB connected !! DB Host:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection Failed:", error);
    if (error.code === "ENOTFOUND" && error.syscall === "querySrv") {
      console.log(
        "Hint: DNS SRV lookup failed for your MongoDB Atlas host. " +
          "If your network blocks DNS SRV, use a standard mongodb:// URI with explicit replica set hosts."
      );
    }
    process.exit(1);
  }
};

export default connectDB;
