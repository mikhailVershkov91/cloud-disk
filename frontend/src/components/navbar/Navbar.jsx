import React from "react";
import s from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducers/userReducer";

const Navbar = () => {
	const isAuth = useSelector((state) => state.user.isAuth);
	const dispatch = useDispatch();

	return (
		<div className={s.container}>
			<div>
				<img src={"/icons/cloud-laptop.svg"} width="40px" height="40px" />
			</div>
			<div className={s.nav}>
				{!isAuth && (
					<NavLink to="/login" className={s.nav_item}>
						Войти
					</NavLink>
				)}
				{!isAuth && (
					<NavLink to="/registration" className={s.nav_item}>
						Регистрация
					</NavLink>
				)}
				{isAuth && (
					<div className={s.nav_item} onClick={() => dispatch(logout())}>
						Выход
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
