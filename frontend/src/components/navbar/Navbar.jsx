import React from "react";
import s from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<div className={s.container}>
			<div className={s.logo}>logo</div>
			<div className={s.nav}>
				<NavLink to="/login" className={s.nav_item}>
					Войти
				</NavLink>
				<NavLink to="/registration" className={s.nav_item}>
					Регистрация
				</NavLink>
			</div>
		</div>
	);
};

export default Navbar;
