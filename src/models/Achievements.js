import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    github: { type: String },
    deployed: { type: String },         
    dateOfEvent: { type: Date },        
    members: [
      {
        name: String,
        linkedin: String,
      },
    ],
    img: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.achievements ||
  mongoose.model("achievements", achievementSchema);