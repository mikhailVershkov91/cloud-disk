import pkg from "mongoose";

const { Schema, model, ObjectId } = pkg;

const FileScheme = new Schema({
	name: { type: "String", required: true },
	type: { type: "String", required: true },
	accessLink: { type: "String" },
	size: { type: "Number", default: 0 },
	path: { type: "String", default: "" },
	date: { type: "Date", default: Date.now() },
	user: { type: ObjectId, ref: "User" },
	parent: { type: ObjectId, ref: "File" },
	childs: [{ type: ObjectId, ref: "File" }],
});

const File = model("File", FileScheme);

export default File;
