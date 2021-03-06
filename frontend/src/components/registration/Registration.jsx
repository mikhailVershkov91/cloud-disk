import React, { useState } from "react";
import Input from "../../utils/input/Input";
import s from "./Registration.module.css";
import { registration } from "../../actions/user";

const Registration = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const registrationHandle = (e) => {
		e.preventDefault();

		registration(email, password);
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
					Завершить
				</button>
			</div>
		</div>
	);
};

export default Registration;
