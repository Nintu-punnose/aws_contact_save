var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Product = require('../Models/product');
const User = require('../Models/user');

// Generate token helper
const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};

// ✅ USER REGISTER (FIXED - ONLY ONE ROUTE)
router.post('/create_user', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save user
        const user = new User({ name, email, password: hashedPassword });
        console.log('Creating user:', user);
        
        await user.save();
        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        console.log('Error in create_user:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// ✅ USER LOGIN
router.post('/user_login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        
        console.log('Login attempt for email:', email);
        
        // Find user
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare passwords (must use await)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log("Creating token");
        
        // Create JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || generateSecretKey(),
            { expiresIn: '1h' }
        );
        
        console.log('Login successful for user:', user._id);
        res.status(200).json({ 
            token: token,
            userId: user._id,
            email: email,
            message: 'Login successful'
        });
    } catch (error) {
        console.log('Error in user_login:', error);
        res.status(500).json({ message: 'Login error', error: error.message });
    }
});

// ✅ CREATE PRODUCT
router.post('/create_product_api', async (req, res) => {
    try {
        const { name, description, price, userid } = req.body;
        
        if (!name || !description || !price || !userid) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const product = new Product({ name, description, price, userid });
        await product.save();
        
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        console.error('Error in create_product_api:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// ✅ RETRIEVE PRODUCTS
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
        console.error('Error in retrieve_product_api:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// ✅ DELETE PRODUCT
router.delete('/delete_product_api/:id', async (req, res) => {
    try {
        const pro_id = req.params.id;
        console.log('Deleting product:', pro_id);
        
        await Product.findByIdAndDelete(pro_id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error in delete_product_api:', error);
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
});

// ✅ UPDATE PRODUCT
router.put('/update_product_api/:id', async (req, res) => {
    try {
        const pro_id = req.params.id;
        const { name, price, description } = req.body;
        
        if (!name || !price || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        console.log('Updating product:', pro_id);
        
        await Product.findByIdAndUpdate(pro_id, { name, price, description });
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error in update_product_api:', error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
});

// ✅ LOGOUT
router.post("/logout", (req, res) => {
    console.log("Logout request received");
    res.status(200).json({ message: "Logout successful" });
});

module.exports = router;
