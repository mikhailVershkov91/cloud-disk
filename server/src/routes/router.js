import express from "express";
import { check } from "express-validator";
import auth from "./auth.js";
import login from "./login.js";

const router = express.Router();

router.post(
	"/registration",
	[
		check("email", "Uncorrect email").isEmail(),
		check(
			"password",
			"Password must be longer than 3 and shorter than 12"
		).isLength({ min: 3, max: 12 }),
	],
	auth
);

router.post("/login", login);

export default router;
