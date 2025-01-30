const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://22cs109:2005@cluster0.qbcwbor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Database connection successful...");
    } catch (e) {
        console.error("Database connection error:", e);
        process.exit(1);
    }
};

module.exports = connectDB;