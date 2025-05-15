import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DB_Service from "../db_service/connection.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const db = new DB_Service();

const generateAccessToken = ({ id, email, fullname }) => {
    return jwt.sign(
        {
            id,
            email,
            fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};
const generateRefreshToken = ({ id }) => {
    return jwt.sign(
        {
            id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

export const registerUser = async (req, res) => {
    const { email, password, name } = req.body;
    console.log(req.body);

    if (!email || !password || !name) {
        throw new ApiError(401, "All Details are required");
    }
    const hash_password = await bcrypt.hash(password, 10);

    db.createQuery(`SELECT * FROM users WHERE email="${email}"`)
        .then((rows) => {
            if (rows.length == 1) {
                return res
                    .status(400)
                    .json(
                        new ApiResponse(
                            false,
                            {},
                            `User with email : ${email} already Exists`
                        )
                    );
            } else {
                db.createQuery(
                    `INSERT INTO users(name, email, password) VALUES("${name}", "${email}", "${hash_password}")`
                )
                    .then((rows) => {
                        return res
                            .status(200)
                            .json(
                                new ApiResponse(
                                    true,
                                    rows,
                                    "Registration Successful"
                                )
                            );
                    })
                    .catch((err) => {
                        throw new ApiError(501, err);
                    });
            }
        })
        .catch((err) => {
            throw new ApiError(501, err);
        });
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(401, "Id is required");
    }
    db.createQuery(`SELECT * FROM users WHERE uid = ${id}`)
        .then((rows) => {
            res.status(200).json(
                new ApiResponse(
                    rows.length ? true : false,
                    rows.length ? rows[0] : {},
                    rows.length ? "User Found" : "No user found"
                )
            );
        })
        .catch((err) => {
            throw new ApiError(500, err);
        });
};

export const loginUser = async (req, res) => {
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
            console.log("Error :: loginUser :", err);
            return res.json({ status: 400, message: err.message });
        });
};
