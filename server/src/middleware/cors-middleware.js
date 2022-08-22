function cors(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methods",
		"GET, PUT, PATCH, POST, DELETE, FETCH, OPTIONS"
	);
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
}

export default cors;
