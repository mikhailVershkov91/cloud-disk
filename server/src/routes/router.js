import express from "express";
import { check } from "express-validator";
import registration from "./registration.js";
import login from "./login.js";
import authMiddleware from "../middleware/auth-middleware.js";
import auth from "./auth.js";
import fileController from "../controllers/fileController.js";

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
	registration
);

router.post("/login", login);

router.get("/auth", authMiddleware, auth);

router.post("/files", authMiddleware, fileController.createDir);
router.get("/files", authMiddleware, fileController.getFiles);

export default router;
