//connect Mongobd with moongoose

import mongoose from "mongoose";
export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true


        })
       
        console.log("MOngodb connected");
         
        
    } catch (error) {
        
        console.log(`Error: ${error.message}`);
        process.exit(1)
 
        
    }
}