import { Router } from "express";

const router = Router();

router.route("/register").post();
router.route("/login").post();
router.route("/update-details").post();

// TODO: get user by id
router.route("/:id").get();

export default router;
