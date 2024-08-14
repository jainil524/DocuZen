import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default function dbConnect() {
    mongoose.connect(process.env.MONGO_URI);

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });
}