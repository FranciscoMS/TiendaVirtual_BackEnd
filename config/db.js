const mongoose = require('mongoose');
require('dotenv').config({ path: 'globals.env' });

const openDB = async () => {
  console.log('Connecting....');
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    console.log('Connected to DB');
  } catch (error) {
    console.log(error);
    process.exit(1); // Stop server in case of error connect
  }
}


module.exports = openDB;