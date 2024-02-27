import asyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/Auth.js";

// @desc Register user
// @route POST /api/users/
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, image } = req.body;
    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            image,
        });

        // Generate token
        const token = generateToken(user._id);

        // Send user data and token in response
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            image: user.image,
            isAdmin: user.isAdmin,
            token: token // Include the token in the response
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Login user
// @route POST /api/users/login
// @access public

const loginUser =asyncHandler(async(req,res)=>{
    const{email,password}= req.body;
    // Checking if fields are empty
    try {
        //find user in DB
        const user = await User.findOne({ email });
        //check if user in db with password
        if (user && (await bcrypt.compare(password, user.password))){
            res.json({
                _id: user._id,
                fullName:user.fullName,
                email: user.email,
                image:user.image,
                isAdmin:user.isAdmin,
                token:generateToken(user._id),

            })
            //if user not found
         
        }else{
             res.status(401);
            throw new Error("Invalid Email or Password");
        }
             
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});
//*****PRIVATE CONTROLLERS *//
// @desc UPDATE user
// @route PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async(req,res)=>{
    //get the data from body
    const{fullName,email,image}=req.body;
    try {
        //find user in db
        const user =await User.findById(req.user._id)
         //if user exist  in db update and save 
         if(user){
            user.fullName=fullName || user.fullName;           
            user.image=image||user.image;
            user.email=email ||user.email;

            const updatedUser =await user.save();
            //send updated user data and token to client
            res.json({
             _id: updatedUser._id,
             fullName: updatedUser.fullName,
             email:updatedUser.email,
             isAdmin: updatedUser.isAdmin,
             token: generateToken(updatedUser._id),
             image: updatedUser.image,

            });
         }
//else send error message
    } catch (error) {
        res.status(400).json({message: error.message});
    }
    
})

export { registerUser, loginUser };
