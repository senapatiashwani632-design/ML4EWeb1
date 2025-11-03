import eventDB from "@/models/events";
import cloudinary, { uploadToCloudinary } from "../../../lib/cloudinary"; 
import { NextRequest } from "next/server";
import connectToEventDB from "@/lib/event";
export async function POST(req: NextRequest) {
  try {
    await connectToEventDB();

    const formData = await req.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const date = formData.get("date");
    const image = formData.get("image") as File;

    let imageUrl = "";
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const uploadRes = await uploadToCloudinary(buffer, "projects");
      imageUrl = uploadRes.secure_url;
    }

    const newEvent = new eventDB({
      name:name,
      description:description,
      date:date,
      image: imageUrl,
    });

    await newEvent.save();

    return new Response(
      JSON.stringify({ message: "Event added successfully!" }),
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error(" Error saving event:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectToEventDB();
    const events = await eventDB.find({}).sort({ createdAt: -1 });
    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error: unknown) {
    console.error(" Error fetching events:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
}
