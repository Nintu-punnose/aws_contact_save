const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true  
}
}, { timestamps: true }); 


const Product = mongoose.model('Product', productSchema);


module.exports = {Product,User};
