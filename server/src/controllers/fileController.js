import fileService from "../services/fileService.js";
import File from "../models/File.js";
import { defaultFilePath } from "../../index.js";
import fs from "fs";
import User from "../models/User.js";

class FileController {
	async createDir(req, res) {
		try {
			const { name, type, parent } = req.body;
			const file = new File({ name, type, parent, user: req.user.id });
			const parentFile = await File.findOne({ _id: parent });

			if (!parentFile) {
				file.path = name;

				await fileService.createDir(file);
			} else {
				file.path = `${parentFile.path}/${file.name}`;

				await fileService.createDir(file);

				parentFile.childs.push(file.id);

				await parentFile.save();
			}

			await file.save();

			return res.json(file);
		} catch (error) {
			console.log(error);
			return res.status(404).json(error);
		}
	}

	async getFiles(req, res) {
		try {
			const { sort } = req.query;

			let files;

			switch (sort) {
				case "name":
					files = await File.find({
						user: req.user.id,
						parent: req.query.parent,
					}).sort({ name: 1 });
					break;

				case "type":
					files = await File.find({
						user: req.user.id,
						parent: req.query.parent,
					}).sort({ type: 1 });
					break;

				case "date":
					files = await File.find({
						user: req.user.id,
						parent: req.query.parent,
					}).sort({ date: 1 });
					break;

				default:
					files = await File.find({
						user: req.user.id,
						parent: req.query.parent,
					});
					break;
			}

			return res.json(files);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Cannot get files" });
		}
	}

	async uploadFiles(req, res) {
		try {
			const file = req.files.file;
			const parent = await File.findOne({
				user: req.user.id,
				_id: req.body.parent,
			});
			const user = await User.findOne({ _id: req.user.id });

			if (user.usedSpace + file.size > user.diskSpace) {
				return res
					.status(404)
					.json({ message: "There's no space on the disk" });
			}

			user.usedSpace = user.usedSpace + file.size;

			let path;

			if (parent) {
				path = `${defaultFilePath}/${user._id}/${parent.path}/${file.name}`;
			} else {
				path = `${defaultFilePath}/${user._id}/${file.name}`;
			}

			if (fs.existsSync(path)) {
				return res.status(404).json({ message: "The file is alredy exist" });
			}

			file.mv(path);

			const type = file.name.split(".").pop();
			let filePath = file.name;

			if (parent) {
				filePath = `${parent.path}/${file.name}`;
			}

			const dbFile = new File({
				name: file.name,
				type,
				size: file.size,
				path: filePath,
				parent: parent?._id,
				user: user._id,
			});

			await dbFile.save();
			await user.save();

			return res.json(dbFile);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Upload error" });
		}
	}

	async downloadFile(req, res) {
		try {
			const file = await File.findOne({ _id: req.query.id, user: req.user.id });
			const path = `${defaultFilePath}/${req.user.id}/${file.path}/${file.name}`;

			if (fs.existsSync(path)) {
				return res.download(path, file.name);
			}

			return res.status(400).json({ message: "Download error" });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Download error" });
		}
	}

	async deleteFile(req, res) {
		try {
			const file = await File.findOne({ _id: req.query.id, user: req.user.id });

			if (!file) {
				return res.status(400).json({ message: "File not found" });
			}

			fileService.deleteFile(file);
			await file.remove();

			return res.json({ message: "File was deleted" });
		} catch (error) {
			console.log(error);
			return res.status(400).json({ message: "Dir is not empty" });
		}
	}

	async searchFile(req, res) {
		try {
			const searchName = req.query.search;

			let files = await File.find({ user: req.user.id });

			files = files.filter((file) => file.name.includes(searchName));

			return res.json(files);
		} catch (error) {
			console.log(error);
			return res.status(400).json({ message: "Search error" });
		}
	}
}

export default new FileController();
