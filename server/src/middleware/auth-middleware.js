import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
	const key = process.env.SECRET_KEY;

	if (req.method === "OPTIONS") {
		return next();
	}

	try {
		const token = req.headers.authorization.split(" ")[1];
		if (!token) {
			return res.status(401).json({ message: "Auth error" });
		}
		const decoded = jwt.verify(token, key);
		req.user = decoded;
		next();
	} catch (e) {
		return res.status(401).json({ message: "Auth error" });
	}
}

export default authMiddleware;
