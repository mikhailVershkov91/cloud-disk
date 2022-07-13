import React, { useState } from "react";
import Input from "../../utils/input/Input";
import s from "./Registration.module.css";
import { registration } from "../../actions/user";
import { toast } from "react-toastify";

const Registration = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const registrationHandle = async (e) => {
		e.preventDefault();

		try {
			await registration(email, password);

			toast.success("Registration completed successfully!");
		} catch (error) {
			console.error(error);
			toast.error("Registration failed");
		}
	};

	return (
		<div className={s.container}>
			<div className={s.form}>
				<div className={s.form_title}>Регистрация</div>
				<div className={s.form_inputs}>
					<Input
						value={email}
						setValue={setEmail}
						type="email"
						placeholder="Введите email"
					/>
					<Input
						value={password}
						setValue={setPassword}
						type="password"
						placeholder="Введите пароль"
					/>
				</div>
				<button className={s.form_btn} onClick={registrationHandle}>
					Войти
				</button>
			</div>
		</div>
	);
};

export default Registration;
