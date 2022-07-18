import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentDir, pushToStack } from "../../../../reducers/fileReducer";

const File = ({ file }) => {
	const dispatch = useDispatch();
	const currentDir = useSelector((state) => state.files.currentDir);

	const openDirHandler = () => {
		dispatch(pushToStack(currentDir));
		dispatch(setCurrentDir(file._id));
	};

	return (
		<tr onClick={file.type === "dir" ? openDirHandler : ""}>
			<td>
				<img
					src={file.type === "file" ? "/icons/file.svg" : "/icons/folder.svg"}
					alt=""
				/>
			</td>
			<td>{file.name}</td>
			<td>{file.size}</td>
			<td>{file.date.slice(0, 10)}</td>
		</tr>
	);
};

export default File;
