import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Create text indexes
    await Promise.all([
      mongoose.model('Memory').createIndexes(),
      mongoose.model('Company').createIndexes(),
      mongoose.model('User').createIndexes(),
    ]);

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;