import React from "react";
import { useSelector } from "react-redux";
import File from "./file/File";
import s from "../Disk.module.css";

const FileList = () => {
	const files = useSelector((state) => state.files.files).map((file) => (
		<File key={file._id} file={file} />
	));

	return (
		<div className={s.file_container}>
			<table>
				<thead>
					<tr>
						<th>Тип</th>
						<th>Название</th>
						<th>Размер</th>
						<th>Дата</th>
					</tr>
				</thead>
				<tbody>{files}</tbody>
			</table>
		</div>
	);
};

export default FileList;
