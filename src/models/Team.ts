import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    githubLink: { type: String },
    linkedinLink: { type: String },
    imageUrl: { type: String }, 
  },
  { timestamps: true }
);

export default mongoose.models.teamDB ||
  mongoose.model("teamDB", ProjectSchema);
