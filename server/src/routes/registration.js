import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import User from "../models/User.js";
import fileService from "../services/fileService.js";
import File from "../models/File.js";

async function registration(req, res) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: "Uncorrect request", errors });
		}
		const { email, password } = req.body;

		const candidate = await User.findOne({ email });

		if (candidate) {
			return res
				.status(400)
				.json({ message: `User with email ${email} already exist` });
		}

		const hashPassword = await bcrypt.hash(password, 8);

		const user = new User({ email, password: hashPassword });
		await user.save();

		await fileService.createDir(new File({ user: user.id, name: "" }));

		return res.json({ message: "User was created" });
	} catch (e) {
		console.log(e);
		res.send({ message: "Server error" });
	}
}

export default registration;
