import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    techStack: { type: String, required: true },
    description: { type: String },
    githubLink: { type: String },
    deployedLink: { type: String },
    imageUrl: { type: String }, 
  },
  { timestamps: true }
);

export default mongoose.models.projects ||
  mongoose.model("projects", ProjectSchema);
