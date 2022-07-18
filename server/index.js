import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./src/routes/router.js";
import cors from "./src/middleware/cors-middleware.js";

dotenv.config();

const app = express();

export const PORT = process.env.PORT;
export const url = process.env.MONGO_URL;
export const defaultFilePath = process.env.FILE_PATH;
export const secretKey = process.env.SECRET_KEY;
export const baseUrl = "/api";

(async () => {
	try {
		await mongoose.connect(url);

		app.use(cors);
		app.use(express.json());
		app.use(baseUrl, router);

		app.listen(PORT, () => {
			console.info(`Server is running on http://localhost:${PORT}`);
		});
	} catch (e) {}
})();
