
import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
    try {
        const dbOptions = {
            dbName: "AuthDATA"
        };
        await mongoose.connect(DATABASE_URL, dbOptions);
        console.log("Database connected successfully...");
    } catch (error) {
        throw error;
    }
};

export default connectDB;