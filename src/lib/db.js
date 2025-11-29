import mongoose from "mongoose";

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("⚠️ Existing connection found. Closing it...");
    await mongoose.connection.close();
    console.log("✅ Previous connection closed");
  };

  try {
    await mongoose.connect(process.env.MongoURL, {
      dbName: "portfolioDB",
    });
    console.log(" Connected to MongoDB");
  } catch (error) {
    console.error(" MongoDB connection error:", error);
  }
};

export default connectToDatabase;
