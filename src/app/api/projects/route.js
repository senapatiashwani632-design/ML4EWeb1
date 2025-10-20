import connectToDatabase from "../../../lib/db";
import Project from "../../../models/Projects";
import cloudinary, { uploadToCloudinary } from "../../../lib/cloudinary"; 

export async function POST(req) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    const name = formData.get("name");
    const techStack = formData.get("techStack");
    const description = formData.get("description");
    const githubLink = formData.get("githubLink");
    const deployedLink = formData.get("deployedLink");
    const screenshot = formData.get("screenshot");

    let imageUrl = "";
    if (screenshot) {
      const buffer = Buffer.from(await screenshot.arrayBuffer());
      const uploadRes = await uploadToCloudinary(buffer, "projects");
      imageUrl = uploadRes.secure_url;
    }

    const newProject = new Project({
      name,
      techStack,
      description,
      githubLink,
      deployedLink,
      imageUrl,
    });

    await newProject.save();

    return new Response(
      JSON.stringify({ message: "Project added successfully!" }),
      { status: 201 }
    );
  } catch (error) {
    console.error(" Error saving project:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    console.error(" Error fetching projects:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
