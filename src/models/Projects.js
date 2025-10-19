import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    techStack: { type: String, required: true },
    description: { type: String, required: true  },
    deployedLink: { type: String, required: true  },
    githubLink: { type: String, required: true  },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
