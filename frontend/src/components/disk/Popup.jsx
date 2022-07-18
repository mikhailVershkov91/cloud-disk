import React, { useState } from "react";
import s from "./Disk.module.css";
import Input from "../../utils/input/Input";
import { useDispatch, useSelector } from "react-redux";
import { createDir } from "../../actions/file";

const Popup = ({ setOpenPopup }) => {
	const [dirName, setDirName] = useState("");

	const dispatch = useDispatch();
	const currentDir = useSelector((state) => state.files.currentDir);

	const createDirHandler = () => {
		dispatch(createDir(currentDir, dirName));
		setOpenPopup(false);
	};

	return (
		<div className={s.container_popup} onClick={() => setOpenPopup(false)}>
			<div className={s.popup} onClick={(event) => event.stopPropagation()}>
				<div className={s.popup_header}>
					<div className={s.popup_header_title}>Создать папку</div>
					<div className={s.popup_close} onClick={() => setOpenPopup(false)}>
						X
					</div>
				</div>
				<Input
					type="text"
					placeholder="Введите название папки..."
					value={dirName}
					setValue={setDirName}
				/>
				<button className={s.disk_btn} onClick={createDirHandler}>
					Создать
				</button>
			</div>
		</div>
	);
};

export default Popup;
