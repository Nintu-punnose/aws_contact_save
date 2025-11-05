var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Product = require('../Models/product');
const User = require('../Models/user');

// user register
router.post('/create_user', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password);
        
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({ name, email, password: hashedPassword });
        console.log(user);
        
        await user.save();
        res.status(200).json({ message: 'user created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error', error: error.message });
    }
});

// generate token
const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};

// user login
router.post('/user_login', async (req, res) => {
    try {
        const email = req.body.email;
        console.log(email);
        
        // Find user by email
        const user = await User.findOne({ email: email });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Compare passwords (bcrypt.compare is async)
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        console.log("creating token");
        
        // Create JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || generateSecretKey(),
            { expiresIn: '1h' }
        );
        
        console.log(user._id);
        res.status(200).json({ token, userId: user._id, email: email });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error', error: error.message });
    }
});

// creating product
router.post('/create_product_api', async (req, res) => {
    try {
        const { name, description, price, userid } = req.body;
        
        // Validate input
        if (!name || !description || !price || !userid) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const product = new Product({ name, description, price, userid });
        await product.save();
        
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// retrieve product
router.get('/retrieve_product_api/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const data = await Product.find({ userid: id });
        
        const serializedData = data.map(product => ({
            id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
        }));
        
        res.status(200).json({ data: serializedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// delete product
router.delete('/delete_product_api/:id', async (req, res) => {
    try {
        const pro_id = req.params.id;
        console.log(pro_id);
        
        await Product.findByIdAndDelete(pro_id);
        res.status(200).json({ message: 'Delete successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
});

// update product
router.put('/update_product_api/:id', async (req, res) => {
    try {
        const pro_id = req.params.id;
        console.log(pro_id);
        
        const { name, price, description } = req.body;
        
        // Validate input
        if (!name || !price || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        await Product.findByIdAndUpdate(pro_id, { name, price, description });
        res.status(200).json({ message: "product updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
});

// user logout
router.post("/logout", (req, res) => {
    console.log("Logout request received");
    res.status(200).json({ message: "Logout successful" });
});

module.exports = router;
