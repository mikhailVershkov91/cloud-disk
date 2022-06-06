import express from "express";
import mongoose from "mongoose";
import config from "config";

const app = express();
const PORT = config.get("serverPort");

const start = async () => {
	try {
		await mongoose.connect(config.get("dbURL"));

		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	} catch (e) {}
};

start();

// const url =
// 	"mongodb+srv://mikhail_vershkov1991:0075482@cluster0.midbj5k.mongodb.net/?retryWrites=true&w=majority";
