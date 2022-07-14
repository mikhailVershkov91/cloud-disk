import axios from "axios";
import { setUser } from "../reducers/userReducer";
import { toast } from "react-toastify";

export const registration = async (email, password) => {
	try {
		await axios.post("http://localhost:5000/api/registration", {
			email,
			password,
		});

		toast.success("Registration completed successfully!");
	} catch (error) {
		console.error(error);
		toast.error("Registration failed");
	}
};

export const login = (email, password) => {
	return async (dispatch) => {
		try {
			const res = await axios.post("http://localhost:5000/api/login", {
				email,
				password,
			});

			dispatch(setUser(res.data.user));
			localStorage.setItem("token", res.data.token);

			toast.success("Login!");
		} catch (error) {
			console.error(error);
			toast.error("Login failed");
		}
	};
};

export const auth = () => {
	return async (dispatch) => {
		try {
			const res = await axios.get("http://localhost:5000/api/auth", {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			});

			dispatch(setUser(res.data.user));
			localStorage.setItem("token", res.data.token);
		} catch (error) {
			console.error(error);
			localStorage.removeItem("token");
			toast.error("Token not found");
		}
	};
};
