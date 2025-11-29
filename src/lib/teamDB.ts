import mongoose from "mongoose";

const connectToTeamDB = async () => {
 
  if (mongoose.connection.readyState >= 1) {
    console.log("⚠️ Existing connection found. Closing it...");
    await mongoose.connection.close();
    console.log("✅ Previous connection closed");
  };

  try {
    await mongoose.connect(process.env.MongoURL!, {
      dbName: "TeamDB", 
    });
    console.log("Db name is:-", mongoose.connection.db!.databaseName);
    console.log(" Connected to Team MongoDB");
  } catch (error) {
    console.error(" MongoDB Team connection error:", error);
  }
};

export default connectToTeamDB;
