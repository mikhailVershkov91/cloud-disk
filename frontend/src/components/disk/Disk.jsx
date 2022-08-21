import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../actions/file";
import s from "./Disk.module.css";
import FileList from "./fileList/FileList";
import Popup from "./Popup";
import { useState } from "react";
import { setCurrentDir } from "../../reducers/fileReducer";

const Disk = () => {
	const [openPopup, setOpenPopup] = useState(false);

	const dispatch = useDispatch();
	const currentDir = useSelector((state) => state.files.currentDir);
	const dirStack = useSelector((state) => state.files.dirStack);

	useEffect(() => {
		dispatch(getFiles(currentDir));
	}, [currentDir, dispatch]);

	const backHandler = () => {
		const backDirId = dirStack.pop();
		dispatch(setCurrentDir(backDirId));
	};

	const fileUploadHandler = (event) => {
		const files = [...event.target.files];

		files.forEach((file) => dispatch(uploadFile(file, currentDir)));
	};

	return (
		<div className={s.container}>
			<div className={s.disk_btns}>
				{currentDir ? (
					<button className={s.disk_btn} onClick={backHandler}>
						Назад
					</button>
				) : (
					<div></div>
				)}
				<div className={s.disk_buttons}>
					<div className={s.disk_upload}>
						<label htmlFor="disk__upload-input" className={s.disk_upload_label}>
							Загрузить файл
						</label>
						<input
							multiple={true}
							onChange={(event) => fileUploadHandler(event)}
							type="file"
							id="disk__upload-input"
							className={s.disk_upload_input}
						/>
					</div>
					<button
						className={s.disk_btn_create}
						onClick={() => setOpenPopup(true)}
					>
						Создать папку
					</button>
				</div>
			</div>
			<FileList />
			{openPopup && <Popup setOpenPopup={setOpenPopup} />}
		</div>
	);
};

export default Disk;
