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
        const userExists = await User.findOne({ email });
        // Check if user exists
        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            image,
        });

        // If user created successfully, send user data and token to client
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            image: user.image,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } catch (error) {
        // Handle any errors
        res.status(400).json({ message: error.message }); // Changed "Invalid User data" to error.message
    }
});

export { registerUser };
