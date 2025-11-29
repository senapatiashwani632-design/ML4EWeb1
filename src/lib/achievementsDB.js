//import mongoose from "mongoose";

// const connectToAchievementsDB = async () => {
 
//   if (mongoose.connection.readyState >= 1) return;

//   try {
//     await mongoose.connect(process.env.MongoURL, {
//       dbName: "achievementDB", 
//     });
//     console.log(" Connected to Achievements MongoDB");
//   } catch (error) {
//     console.error(" MongoDB Achievements connection error:", error);
//   }
// };
// const connectToAchievementsDB = async () => {
//   if (mongoose.connection.readyState >= 1) {
//     console.log("✅ Already connected to Achievements MongoDB");
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MongoURL, {
//       dbName: "achievementDB", 
//     });
//     console.log("✅ Connected to Achievements MongoDB");
//   } catch (error) {
//     console.error("❌ MongoDB Achievements connection error:", error);
//   }
// };

// export default connectToAchievementsDB;
// lib/achievementsDB.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MongoURL;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToAchievementsDB() {
  if (cached.conn) {
    console.log("✅ Using cached database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Maintain up to 10 connections
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ New database connection established");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToAchievementsDB;
