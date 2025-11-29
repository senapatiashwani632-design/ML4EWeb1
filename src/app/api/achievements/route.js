import connectToAchievementsDB from "../../../lib/achievementsDB";
import Achievement from "../../../models/Achievements";
import { uploadToCloudinary } from "../../../lib/cloudinary";

export async function POST(req) {
  try {
    await connectToAchievementsDB(); // ✅ connect to DB

    const formData = await req.formData();
    console.log("📥 Received form data for new achievement.", formData);
    const title = formData.get("achievementName");
    const github = formData.get("githubLink");
    const deployed = formData.get("deployedLink");        // ✅ new
    const dateOfEvent = formData.get("dateOfEvent");  // ✅ new
    const membersRaw = formData.get("members");
    const certificate = formData.get("certificate");

    // Parse members JSON safely
    let members = [];
    if (membersRaw) {
      try {
        members = JSON.parse(membersRaw);
      } catch {
        members = [];
      }
    }

    // Upload certificate to Cloudinary
    let imageUrl = "";
    if (certificate) {
      const buffer = Buffer.from(await certificate.arrayBuffer());
      const uploadRes = await uploadToCloudinary(buffer, "achievements");
      imageUrl = uploadRes.secure_url;
    }

    // Create new document
    const newAchievement = new Achievement({
      title,
      github,
      deployed,       // ✅ added
      dateOfEvent,    // ✅ added
      members,
      img: imageUrl,
    });

    await newAchievement.save();

    return new Response(
      JSON.stringify({ message: "Achievement added successfully!" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error saving achievement:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectToAchievementsDB();
    const achievements = await Achievement.find({}).sort({ createdAt: -1 });
    return new Response(JSON.stringify(achievements), { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching achievements:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
// api/achievements/route.js
// export async function GET() {
//   const maxRetries = 3;
//   let lastError;

//   for (let i = 0; i < maxRetries; i++) {
//     try {
//       await connectToAchievementsDB();
      
//       const achievements = await Achievement.find({})
//         .sort({ createdAt: -1 })
//         .lean()
//         .maxTimeMS(5000); // 5 second timeout
      
//       return new Response(JSON.stringify(achievements), { 
//         status: 200,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     } catch (error) {
//       lastError = error;
//       console.error(`❌ Attempt ${i + 1} failed:`, error);
      
//       if (i < maxRetries - 1) {
//         await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
//       }
//     }
//   }

//   return new Response(
//     JSON.stringify({ 
//       error: "Failed to fetch achievements after retries",
//       details: lastError.message 
//     }), 
//     { status: 500 }
//   );
// }
