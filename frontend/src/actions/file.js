import axios from "axios";
import { toast } from "react-toastify";
import { setFiles, addFile } from "../reducers/fileReducer";

export const getFiles = (dirId) => {
	return async (dispatch) => {
		try {
			const res = await axios.get(
				`http://localhost:5000/api/files${dirId ? "?parent=" + dirId : ""}`,
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				}
			);

			dispatch(setFiles(res.data));
		} catch (error) {
			console.error(error);
			toast.error("Files not found");
		}
	};
};

export const createDir = (dirId, name) => {
	return async (dispatch) => {
		try {
			const res = await axios.post(
				`http://localhost:5000/api/files`,
				{
					name,
					parent: dirId,
					type: "dir",
				},
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				}
			);

			dispatch(addFile(res.data));
		} catch (error) {
			console.error(error);
			toast.error("Files not found");
		}
	};
};

export const uploadFile = (file, dirId) => {
	return async (dispatch) => {
		try {
			const formData = new FormData();
			formData.append("file", file);

			if (dirId) {
				formData.append("parent", dirId);
			}

			const res = await axios.post(
				`http://localhost:5000/api/upload`,
				formData,
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
					onUploadProgress: (progressEvent) => {
						const totalLength = progressEvent.lengthComputable
							? progressEvent.total
							: progressEvent.target.getResponseHeader("content-length") ||
							  progressEvent.target.getResponseHeader(
									"x-decompressed-content-length"
							  );
						console.log("total", totalLength);

						if (totalLength) {
							let progress = Math.round(
								(progressEvent.loaded * 100) / totalLength
							);
							console.log(progress);
						}
					},
				}
			);

			dispatch(addFile(res.data));
		} catch (error) {
			console.error(error);
			toast.error("Files not found");
		}
	};
};
