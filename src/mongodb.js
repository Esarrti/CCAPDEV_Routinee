const mongoose = require("mongoose");

const uri =
  "mongodb+srv://jbautishta:Justin6353@routinee.g1neljc.mongodb.net/routinee_db?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

const RoutineeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  age: {
    type: Number,
  },
  birthday: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
});

const collection = new mongoose.model("Collection1", RoutineeSchema);

module.exports = collection;
