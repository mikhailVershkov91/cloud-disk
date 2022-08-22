import React from "react";
import s from "../Disk.module.css";
import { useDispatch } from "react-redux";
import { removeUploadFile } from "../../../reducers/uploadReducer";

const UploadFile = ({ file }) => {
	const dispatch = useDispatch();

	return (
		<div className={s.upload_file}>
			<div className={s.upload_file_header}>
				<div className={s.upload_file_name}>{file.name}</div>
				<button
					className={s.upload_file_remove}
					onClick={() => dispatch(removeUploadFile(file.id))}
				>
					X
				</button>
			</div>
			<div className={s.upload_file_progress_bar}>
				<div
					className={s.upload_file_upload_bar}
					style={{ width: file.progress + "%" }}
				/>
				<div className={s.upload_file_percent}>{file.progress} %</div>
			</div>
		</div>
	);
};

export default UploadFile;
