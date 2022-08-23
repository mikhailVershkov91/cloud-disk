import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile, searchFile } from "../../actions/file";
import s from "./Disk.module.css";
import FileList from "./fileList/FileList";
import Popup from "./Popup";
import { useState } from "react";
import { setCurrentDir } from "../../reducers/fileReducer";
import Uploader from "./uploader/Uploader";
import Loader from "../../utils/loader/Loader";
import { useDebouncedValue } from "@mantine/hooks";

const Disk = () => {
	const [openPopup, setOpenPopup] = useState(false);
	const [dragEnter, setDragEnter] = useState(false);
	const [sort, setSort] = useState("type");
	const [search, setSearch] = useState("");
	const [debouncedSearch] = useDebouncedValue(search, 200);

	const dispatch = useDispatch();
	const currentDir = useSelector((state) => state.files.currentDir);
	const dirStack = useSelector((state) => state.files.dirStack);
	const loader = useSelector((state) => state.app.loader);

	useEffect(() => {
		dispatch(getFiles(currentDir, sort));
		// eslint-disable-next-line
	}, [currentDir, sort]);

	const backHandler = () => {
		const backDirId = dirStack.pop();
		dispatch(setCurrentDir(backDirId));
	};

	const fileUploadHandler = (event) => {
		const files = [...event.target.files];

		files.forEach((file) => dispatch(uploadFile(file, currentDir)));
	};

	const dragEnterHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragEnter(true);
	};

	const dragLeaveHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragEnter(false);
	};

	const dropHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
		let files = [...e.dataTransfer.files];
		files.forEach((file) => dispatch(uploadFile(file, currentDir)));

		setDragEnter(false);
	};

	const searchHandler = (e) => {
		setSearch(e.target.value);

		if (e.target.value !== "") {
			dispatch(searchFile(debouncedSearch));
		} else {
			dispatch(getFiles(currentDir));
		}
	};

	if (loader) {
		return <Loader />;
	}

	return !dragEnter ? (
		<div
			className={s.container}
			onDragEnter={dragEnterHandler}
			onDragLeave={dragLeaveHandler}
			onDragOver={dragEnterHandler}
		>
			<div className={s.disk_btns}>
				<div className={s.disk_btns_select}>
					{currentDir ? (
						<button className={s.disk_btn} onClick={backHandler}>
							Назад
						</button>
					) : (
						<div className={s.empty_space}></div>
					)}
					<div>
						<select
							className={s.disk_select}
							value={sort}
							onChange={(e) => setSort(e.target.value)}
						>
							<option value="name">По имени</option>
							<option value="type">По типу</option>
							<option value="date">По дате</option>
						</select>
					</div>
					<div>
						<input
							className={s.search_input}
							type="text"
							placeholder="Поиск файла..."
							value={search}
							onChange={searchHandler}
						/>
					</div>
				</div>
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
			<Uploader />
			{openPopup && <Popup setOpenPopup={setOpenPopup} />}
		</div>
	) : (
		<div
			className={s.drag_area}
			onDragEnter={dragEnterHandler}
			onDragLeave={dragLeaveHandler}
			onDragOver={dragEnterHandler}
			onDrop={dropHandler}
		>
			Перетащите файлы в эту область
		</div>
	);
};

export default Disk;
