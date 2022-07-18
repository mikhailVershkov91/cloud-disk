import User from "../models/User.js";
import { secretKey } from "../../index.js";
import jwt from "jsonwebtoken";

async function auth(req, res) {
	try {
		const user = await User.findOne({ _id: req.user.id });

		const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });

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

export default auth;
