import { Router } from "express";
import { getUserById, registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post();
router.route("/update-details").post();
router.route("/:id").get(getUserById);

export default router;
