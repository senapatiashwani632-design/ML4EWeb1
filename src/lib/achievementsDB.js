import mongoose from "mongoose";

const connectToAchievementsDB = async () => {
 
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MongoURL, {
      dbName: "achievementDB", 
    });
    console.log(" Connected to Achievements MongoDB");
  } catch (error) {
    console.error(" MongoDB Achievements connection error:", error);
  }
};

export default connectToAchievementsDB;
