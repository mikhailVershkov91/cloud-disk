import axios from "axios";
import { toast } from "react-toastify";
import { setFiles, addFile, deleteFileAction } from "../reducers/fileReducer";
import {
	showUploader,
	addUploadFile,
	changeUploadFile,
} from "../reducers/uploadReducer";

export const getFiles = (dirId, sort) => {
	return async (dispatch) => {
		try {
			let url = "http://localhost:5000/api/files";

			if (dirId) {
				url = `http://localhost:5000/api/files?parent=${dirId}`;
			}

			if (sort) {
				url = `http://localhost:5000/api/files?sort=${sort}`;
			}

			if (dirId && sort) {
				url = `http://localhost:5000/api/files?parent=${dirId}&sort=${sort}`;
			}
			const res = await axios.get(url, {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			});

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

			const uploadFile = { name: file.name, progress: 0, id: Date.now() };
			dispatch(showUploader());
			dispatch(addUploadFile(uploadFile));

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

						if (totalLength) {
							uploadFile.progress = Math.round(
								(progressEvent.loaded * 100) / totalLength
							);
							dispatch(changeUploadFile(uploadFile));
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

export const downloadFile = async (file) => {
	const res = await fetch(`http://localhost:5000/api/download?id=${file._id}`, {
		headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
	});

	if (res.status === 200) {
		const blob = await res.blob();
		const downloadUrl = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = downloadUrl;
		link.download = file.name;
		document.body.appendChild(link);
		link.click();
		link.remove();
	}
};

export const deleteFile = (file) => {
	return async (dispatch) => {
		try {
			await axios.delete(`http://localhost:5000/api/files?id=${file._id}`, {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			});

			dispatch(deleteFileAction(file._id));
			toast.success("File was deleted");
		} catch (error) {
			console.error(error);
			toast.error("File not found");
		}
	};
};
