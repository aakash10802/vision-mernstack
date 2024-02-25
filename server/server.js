import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

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



//rest api
app.get("/", (req, res) => {
  res.send("API is running");
});

//PORT
const PORT = process.env.PORT || 5000;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on in port ${PORT}` 
  );
});
