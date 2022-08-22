import React from "react";
import s from "../Disk.module.css";
import UploadFile from "./UploadFile";
import { useSelector, useDispatch } from "react-redux";
import { hideUploader } from "../../../reducers/uploadReducer";

const Uploader = () => {
	const files = useSelector((state) => state.upload.files);
	const isVisible = useSelector((state) => state.upload.isVisible);
	const dispatch = useDispatch();

	return (
		isVisible && (
			<div className={s.uploader}>
				<div className={s.uploader_header}>
					<div className={s.uploader_header_title}>Загрузки</div>
					<div
						className={s.uploader_close}
						onClick={() => dispatch(hideUploader())}
					>
						X
					</div>
				</div>
				{files.map((file) => (
					<UploadFile key={file.id} file={file} />
				))}
			</div>
		)
	);
};

export default Uploader;
