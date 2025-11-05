var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Product = require('../Models/product');
const User = require('../Models/user');


// user register
router.post('/create_user',(req,res)=>{
    const {name,email,password} = req.body;
    console.log(name,email,password)
    const user = new User({name,email,password});
    console.log(user)
    user.save().then(()=>{
        res.status(200).json({ message: 'user created successfully' });       
    })
    .catch((error)=>{
        res.status(500).json({ message: 'error' });       
    })
})




//generate token
const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};


//user login
router.post('/user_login',(req,res)=>{
    const email = req.body.email
    console.log(email)
    User.findOne({email:email}).then((user)=>{
        if(!bcrypt.compare(req.body.password,user.password)){
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        console.log("creating token")
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET = generateSecretKey(), { expiresIn: '1h' });
        console.log(user._id)
        res.status(200).json({ token,userId:user._id,email:email });
    })
})




//creating product
 router.post('/create_product_api', (req, res) => {
   const { name, description, price, userid } = req.body;
   const product = new Product({ name, description, price, userid });

   product.save()
       .then(() => {
        res.status(201).json({ message: 'Product created successfully' });       
    })
       .catch((error) => {
           console.error(error);
           res.status(500).json({ message: 'Server Error' });
       });
});



//reterive product
router.get('/retrieve_product_api/:id', (req, res) => {
    const { id } = req.params;
    Product.find({userid:id})
        .then(data => {
            const serializedData = data.map(product => ({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
            }));
            res.status(200).json({ data: serializedData });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});




//delete product
router.delete('/delete_product_api/:id',(req,res)=>{
    const pro_id = req.params.id;
    console.log(pro_id)
    Product.findByIdAndDelete(pro_id).then(()=>{
        res.status(200).json({message:'Delete successfully'})
    }
    )
})




//update product
router.put('/update_product_api/:id',(req,res)=>{
    const pro_id = req.params.id;
    console.log(pro_id)
    const { name, price, description } = req.body;

    Product.findByIdAndUpdate(pro_id,{name,price,description})
    .then((response)=>{
        res.status(200).json({message:"product updated sucessfully"})
    })
})





// user logout
router.post("/logout", (req, res) => {
    console.log("Logout request received"); 
  res.status(200).json({ message: "Logout successful" });
});

module.exports = router;



