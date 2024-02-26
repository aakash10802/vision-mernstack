import jwt from "jsonwebtoken";

// @desc generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { // Corrected "JWT_SECERT" to "JWT_SECRET"
        expiresIn: "1d",  
    });
};

export { generateToken };
