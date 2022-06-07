import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

async function login(req, res) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: "Uncorrect request", errors });
		}

		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const isPassValid = bcrypt.compareSync(password, user.password);
		if (!isPassValid) {
			return res.status(400).json({ message: "Invalid password" });
		}

		const key = process.env.SECRET_KEY;

		const token = jwt.sign({ id: user.id }, key, { expiresIn: "1h" });

		return res.json({
			token,
			user: {
				id: user.id,
				email: user.email,
				diskSpace: user.diskSpace,
				usedSpace: user.usedSpace,
				avatar: user.avatar,
			},
		});
	} catch (e) {
		console.log(e);
		res.send({ message: "Server error" });
	}
}

export default login;
