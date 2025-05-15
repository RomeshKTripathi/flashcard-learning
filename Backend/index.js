import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import db from "./db_service/connection.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import verify from "./middleware/verify.middleware.js";
dotenv.config({
    path: ".env",
});
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// Routes

import userRouter from "./routes/user.route.js";
import questionRouter from "./routes/questions.route.js";
import { loginUser, registerUser } from "./controllers/user.controller.js";
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/users", userRouter);

app.post("/register", registerUser);

app.post("/login", verify, loginUser);

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on ${process.env.PORT}`);
});
