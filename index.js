const express = require('express');
const openDB = require('./config/db');
const cors = require('cors');

//Create server
const app = express();

//Conect to DB
openDB();

//Enable cors
app.use(cors());

//Enable express.json
app.use(express.json({ extended: true }));

//App listening port
const PORT = process.env.PORT || 4000; 

//Import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/products', require('./routes/products'));
app.use('/api/shopping', require('./routes/shopping'));

//Start server
app.listen(PORT, () => {
  console.log(`Working server on port ${PORT}`);
});