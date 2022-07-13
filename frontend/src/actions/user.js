import axios from "axios";

export const registration = async (email, password) => {
	const res = await axios.post("http://localhost:5000/api/registration", {
		email,
		password,
	});

	return res.data;
};
