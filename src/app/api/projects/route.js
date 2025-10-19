import connectToDatabase from "../../../lib/db";
import Project from "../../../models/Projects";

// 🟢 Create new project
export async function POST(req) {
  try {
    const { name, techStack, description, githubLink, deployedLink } = await req.json();

    await connectToDatabase();

    const newProject = new Project({
      name,
      techStack,
      description,
      githubLink,
      deployedLink,
    });

    await newProject.save();

    return new Response(
      JSON.stringify({ message: "Project added successfully!" }),
      { status: 201 }
    );
  } catch (error) {
    console.error(" Error saving project:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// 🔵 Fetch all projects
export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find({});
    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    console.error(" Error fetching projects:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
