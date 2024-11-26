import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import managerRouter from "./routes/managerRoutes";
import workRouter from "./routes/workRoutes";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api/manager", managerRouter);
app.use("/api/work", workRouter);



mongoose
  .connect(process.env.MONGO_URI || "", {})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port${PORT}`));
  })
  .catch((err) => console.error("Database connection error:", err));
