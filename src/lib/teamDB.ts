import mongoose from "mongoose";

const connectToTeamDB = async () => {
 
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MongoURL!, {
      dbName: "TeamDB", 
    });
    console.log(" Connected to Team MongoDB");
  } catch (error) {
    console.error(" MongoDB Team connection error:", error);
  }
};

export default connectToTeamDB;
