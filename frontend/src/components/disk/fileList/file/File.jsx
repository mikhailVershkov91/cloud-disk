import React from "react";
import s from "../../Disk.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentDir, pushToStack } from "../../../../reducers/fileReducer";
import { downloadFile, deleteFile } from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";

const File = ({ file }) => {
	const dispatch = useDispatch();
	const currentDir = useSelector((state) => state.files.currentDir);

	const openDirHandler = () => {
		if (file.type === "dir") {
			dispatch(pushToStack(currentDir));
			dispatch(setCurrentDir(file._id));
		}
	};

	const downloadClickHandler = (e) => {
		e.stopPropagation();
		downloadFile(file);
	};

	const deleteClickHandler = (e) => {
		e.stopPropagation();
		dispatch(deleteFile(file));
	};

	return (
		<tr onClick={openDirHandler}>
			<td>
				<img
					src={file.type !== "dir" ? "/icons/file.svg" : "/icons/folder.svg"}
					alt=""
				/>
			</td>
			<td>{file.name}</td>
			<td>{sizeFormat(file.size)}</td>
			<td>{file.date.slice(0, 10)}</td>
			<td className={s.action_btns}>
				{file.type !== "dir" ? (
					<button
						className={s.download_btn}
						onClick={(e) => downloadClickHandler(e)}
					>
						Скачать
					</button>
				) : (
					<div></div>
				)}
				<button className={s.delete_btn} onClick={(e) => deleteClickHandler(e)}>
					Удалить
				</button>
			</td>
		</tr>
	);
};

export default File;
