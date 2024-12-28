
import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    default: "Medium",
  },
  status: {
    type: String,
    default: "Pending",
  },
  dateSubmitted: {
    type: Date,
    default: Date.now,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Feedback", feedbackSchema);

