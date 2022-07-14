import React, { useState } from "react";
import Input from "../../utils/input/Input";
import s from "./Registration.module.css";
import { login } from "../../actions/user";
import { useDispatch } from "react-redux";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const loginHandle = (e) => {
		e.preventDefault();

		dispatch(login(email, password));
	};

	return (
		<div className={s.container}>
			<div className={s.form}>
				<div className={s.form_title}>Авторизация</div>
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
				<button className={s.form_btn} onClick={loginHandle}>
					Войти
				</button>
			</div>
		</div>
	);
};

export default Login;
