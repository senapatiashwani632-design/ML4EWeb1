import connectToTeamDB from "../../../lib/teamDB";
import teamDB from "../../../models/Team";
import cloudinary, { uploadToCloudinary } from "../../../lib/cloudinary"; 
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToTeamDB();

    const formData = await req.formData();

    const name = formData.get("name");
    const role = formData.get("role");
   // const description = formData.get("description");
    const githubLink = formData.get("githubLink");
    const linkedinLink = formData.get("linkedinLink");
    const imageFile = formData.get("imageUrl") as File;

    let imageUrl = "";
    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadRes = await uploadToCloudinary(buffer, "projects");
      imageUrl = uploadRes.secure_url;
    }

    const newTeamMember = new teamDB({
      name,
      role,
      githubLink,
      linkedinLink ,
      imageUrl,
    });

    await newTeamMember.save();

    return new Response(
      JSON.stringify({ message: "Team member added successfully!" }),
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error(" Error saving team member:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectToTeamDB();
    const teamMembers = await teamDB.find({}).sort({ createdAt: -1 });
    return new Response(JSON.stringify(teamMembers), { status: 200 });
  } catch (error: unknown) {
    console.error(" Error fetching team members:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
}
