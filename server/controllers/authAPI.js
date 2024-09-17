const User = require("../models/userSchema");

module.exports.signin= async (req,res)=>{
    const {name,email}=req.body;
    try {
   
        // Check if the user already exists
        let user = await User.findOne({ useremail:email });

        if (!user) {
            // Create a new user if they don't exist
            user = new User({
                username:name,
                useremail:email
            });

            await user.save();
        }
        res.status(200).json({
          username: name,
        });

    } catch (err) {
        
        res.status(500).json({ message: 'Server error' });
    }
};
