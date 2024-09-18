const User = require("../models/userSchema");

const bcrypt = require("bcryptjs");

module.exports.signup = async (req, res) => {
  try {
    const { username, useremail, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ useremail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = new User({
      username,
      useremail,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports.signin= async (req,res)=>{
    const { email, password } = req.body;
    try {
   
        let user = await User.findOne({ useremail:email });

      if (!user) {
        return res.status(404).json({ message: "User not found. Please check your email" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password." });
      }

      return res.status(200).json({ username: user.username });
    } catch (err) {
        
        res.status(500).json({ message: 'Server error' });
    }
};

