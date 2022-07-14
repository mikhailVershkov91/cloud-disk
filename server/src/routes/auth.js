import User from "../models/User.js";

async function auth(req, res) {
	try {
		const user = User.findOne({ _id: req.user.id });

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

export default auth;
