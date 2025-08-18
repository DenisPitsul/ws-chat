require("dotenv").config();
const mongoose = require("mongoose");

const env = process.env.NODE_ENV ?? "development";

let mongoURI;

if (env === "production") {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables!");
  }
  mongoURI = process.env.MONGO_URI;
} else {
  const { host, port, dbName } = require("./../configs/mongoDBConfig.json")[
    env
  ];
  mongoURI = `mongodb://${host}:${port}/${dbName}`;
}

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`MongoDB connected (${env})`))
  .catch((err) => console.log("MongoDB connection error:", err));

process.on("SIGINT", async () => {
  mongoose.disconnect().then(() => {
    console.log("Mongoose disconnected");
    process.exit();
  });
});

module.exports.Message = require("./message");
module.exports.User = require("./user");
module.exports.Group = require("./group");
