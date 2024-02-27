import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    fullName:{
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an Email address"],  
        trim: true,
    },
    password:{
        type: String,
        required: [true, "Please Provide a Password"],  
        minlength: [6, "Password must be atleast 6 Character"]  
    },
    image:{
        type: String,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    likedMovies:[
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref: "Movie"
        },
    ],
},
{
    timestamps: true,
});

// Method to get token for user authentication
export default mongoose.model("User", UserSchema);
