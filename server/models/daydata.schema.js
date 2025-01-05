import mongoose from "mongoose";

const dayDataSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: [
      "Rose",
      "Propose",
      "Chocolate",
      "Teddy",
      "Promise",
      "Hug",
      "Kiss",
      "Valentine",
    ],
    required: true,
  },
  messages: {
    type: [String], 
    required: true,
  },
  images: {
    type: [String], 
    required: true,
  },
  needToTellSomething: {
    type: String, // Any additional information
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
});

export default mongoose.model("DayData", dayDataSchema);
