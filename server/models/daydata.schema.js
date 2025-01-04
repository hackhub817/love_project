import mongoose from "mongoose";

const dayDataSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  heroSectionImage: {
    type: String, // URL or file path for the hero section image
    required: true,
  },
  image2: {
    type: String, // URL or file path for the second image
    required: true,
  },
  imageMemories: {
    type: String, // URL or file path for the memories image
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
