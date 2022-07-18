import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import "./app.css";
import Navbar from "./components/navbar/Navbar";
import Registration from "./components/registration/Registration";
import ToastMessage from "./utils/toast/ToastMessage";
import Login from "./components/registration/Login";
import Disk from "./components/disk/Disk";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { auth } from "./actions/user";

const App = () => {
	const isAuth = useSelector((state) => state.user.isAuth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(auth());
	}, [dispatch]);

	return (
		<Router>
			<ToastMessage />
			<div className="app">
				<Navbar />
				{!isAuth ? (
					<Routes>
						<Route path="/registration" element={<Registration />} />
						<Route path="/login" element={<Login />} />
						<Route path="/login" element={<Navigate to="/login" />} />
					</Routes>
				) : (
					<Routes>
						<Route path="/disk" element={<Disk />} />
						<Route path="/login" element={<Navigate to="/disk" />} />
					</Routes>
				)}
			</div>
		</Router>
	);
};

export default App;
