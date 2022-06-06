import pkg from "mongoose";

const { Schema, model, ObjectId } = pkg;

const UserScheme = new Schema({
	email: { type: "String", required: true },
	password: { type: "String", required: true },
	diskSpace: { type: "Number", default: 1024 ** 3 * 10 },
	usedSpace: { type: "Number", default: 0 },
	avatar: { type: "String" },
	files: [{ type: ObjectId, ref: "File" }],
});

const User = model("User", UserScheme);

export default User;
