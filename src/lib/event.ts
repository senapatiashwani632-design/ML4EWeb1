import mongoose from "mongoose";

const connectToEventDB = async () => {
 
  if (mongoose.connection.readyState >= 1) {
    console.log("⚠️ Existing connection found. Closing it...");
    await mongoose.connection.close();
    console.log("✅ Previous connection closed");
  };

  try {
    await mongoose.connect(process.env.MongoURL!, {
      dbName: "eventDB", 
    });
    console.log("Db name is:-", mongoose.connection.db!.databaseName);
    console.log(" Connected to Event MongoDB");
  } catch (error) {
    console.error(" MongoDB Event connection error:", error);
  }
};

export default connectToEventDB;
