import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = (url) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
}

export default connectDB;

