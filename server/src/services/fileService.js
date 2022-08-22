import fs from "fs";
import { defaultFilePath } from "../../index.js";

class FileService {
	createDir(file) {
		const filePath = `${defaultFilePath}/${file.user}/${file.path}`;

		return new Promise((resolve, reject) => {
			try {
				if (!fs.existsSync(filePath)) {
					fs.mkdirSync(filePath);
					return resolve({ message: "File was created" });
				} else {
					return reject({ message: "File already exist" });
				}
			} catch (error) {
				return reject({ message: "File error" });
			}
		});
	}

	getPath(file) {
		return `${defaultFilePath}/${file.user}/${file.path}`;
	}

	deleteFile(file) {
		const path = this.getPath(file);
		if (file.type === "dir") {
			fs.rmdirSync(path);
		} else {
			fs.unlinkSync(path);
		}
	}
}

export default new FileService();
