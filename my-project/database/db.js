const mongoose = require('mongoose');

mongoose.connect('mongodb://adminComs:ComstreaM2025@16.171.53.11:27017/admin');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


module.exports = db;

