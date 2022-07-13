import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMessage = ({ ...props }) => {
	return (
		<div>
			<ToastContainer
				position="bottom-right"
				autoClose={1500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				{...props}
			/>
		</div>
	);
};

export default ToastMessage;
