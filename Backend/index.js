import express from "express";
import bodyParser from "body-parser";

import cors from "cors";
import cookieParser from "cookie-parser";
import verify from "./middleware/verify.middleware.js";

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// Routes

import userRouter from "./routes/user.route.js";
import questionRouter from "./routes/questions.route.js";
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/users", userRouter);

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    db.createUser({ name, email, password })
        .then((data) => {
            return res.json({ status: 200, data });
        })
        .catch((err) => {
            console.log("Error :: createUser :", err);

            return res.json({ status: 400, message: err.message });
        });
});

app.post("/login", verify, (req, res) => {
    const { email, password } = req.body;
    db.loginUser({ email, password })
        .then((data) => {
            console.log(data);
            res.cookie("token", data.token);
            return res.json({
                status: 200,
            });
        })
        .catch((err) => {
            console.log("Error :: createUser :", err);
            return res.json({ status: 400, message: err.message });
        });
});

app.listen(4000, () => {
    console.log("Listening on 4000");
});
