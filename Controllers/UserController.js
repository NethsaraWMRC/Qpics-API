require("dotenv").config();
const User = require("../models/user")
const jwt = require('jsonwebtoken');
const bycrypt = require("bcryptjs")

exports.regUser = async (req, res) =>{
    try{
      
      const { username, email, password } = req.body;

      
      if (!(email && password && username)) {
        res.status(400).send("All input is required");
      }

      
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }

      const encryptedPwd = await bycrypt.hash(password, 10);

      const user = await User.create({
        username,
        email:email.toLowerCase(),
        password : encryptedPwd,

      })

      user.save()

      const token = jwt.sign({user_id:user._id},process.env.TOKEN_KEY,{ expiresIn: "2h",})

      res.header("auth-token",token).send(token);

      // const cookieToken = req.cookies.token;

      // res.status(201).json({ message: 'Registration Successful'});

    }catch{
        if (err.code === 11000) {
            res.status(400).json({ message: 'Email address is already in use.' });
          } else {
            res.status(500).json({ message: 'Internal server error' });
          }
    }
    
}



exports.loginUser = async (req, res) =>{
    try{
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }

      // Validate if user exist in our database

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401);
      }


       const isPasswordValid = bycrypt.compare(password, user.password);

       if (!isPasswordValid) {
        return res.status(401).json({ message: 'Authentication failed. Password is incorrect'});
      }

      const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, { expiresIn: '2h' });

      const hed=res.header("auth-token",token).send(token)
      

      // res.status(201).json({ message: 'Login Successful'});
        
        
    }catch (error) {
        console.error(error);
        res.status(500)
      }
    
}

exports.getUser = async (req,res)=>{
  try{
    const currentUser = await User.findOne({_id:req.user.user_id});
    res.json(currentUser);
  }catch(err){
    res.json(err)
  }
}

