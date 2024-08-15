import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post();
router.route("/update-details").post();
router.route("/:id").get();

export default router;
