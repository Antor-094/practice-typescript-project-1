import app from './app';
import mongoose from 'mongoose';
import config from './app/config/index';

async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);
    app.listen(config.PORT, () => {
      console.log(`Example app listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

main();
