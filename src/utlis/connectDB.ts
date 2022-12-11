import mongoose from 'mongoose';

const dbUri: string = process.env.DB_URI || '';

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri);
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
