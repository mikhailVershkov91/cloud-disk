import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./app.css";
import Navbar from "./components/navbar/Navbar";
import Registration from "./components/registration/Registration";
import ToastMessage from "./utils/toast/ToastMessage";

const App = () => {
	return (
		<Router>
			<ToastMessage />
			<div className="app">
				<Navbar />
				<Routes>
					<Route path="/registration" element={<Registration />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
