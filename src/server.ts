import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  try {
    // Connect to the database
    await mongoose.connect(config.database_url as string);
    // If the database connection is successful, log a message
    console.log('Connected to the database');

    // Start the application server
    app.listen(config.port, () => {
      console.log(`server listening on port ${config.port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();
