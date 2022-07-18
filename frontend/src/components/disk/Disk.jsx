import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles } from "../../actions/file";
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
				<button
					className={s.disk_btn_create}
					onClick={() => setOpenPopup(true)}
				>
					Создать папку
				</button>
			</div>
			<FileList />
			{openPopup && <Popup setOpenPopup={setOpenPopup} />}
		</div>
	);
};

export default Disk;
