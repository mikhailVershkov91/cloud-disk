import React from "react";
import s from "./Input.module.css";

const Input = ({ type, placeholder, value, setValue }) => {
	return (
		<input
			className={s.input}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
};

export default Input;
