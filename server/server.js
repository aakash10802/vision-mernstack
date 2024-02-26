import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./Routes/UserRouter.js"
import { errorHandler } from "./middlewares/errorMIddleware.js";
//configure env
dotenv.config();


// //rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
// app.use(morgan("dev"));

//databse config
connectDB();



//Main Route
app.get("/", (req, res) => {
  res.send("API is running");
});
//other routes
app.use("/api/users", userRouter);

//error handling
app.use(errorHandler)


//PORT
const PORT = process.env.PORT || 5000;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on in port ${PORT}` 
  );
});
