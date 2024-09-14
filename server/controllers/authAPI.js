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
        else{
            console.log("User found");
        }

        // Respond with the username
        res.status(200).json({
          username: name,
        });

    } catch (err) {
        // console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
