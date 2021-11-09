import { useEventListener } from "@chakra-ui/hooks";
import { classNames } from "lib/classNames";
import moment from "moment";
import React, { useState, useRef } from "react";
import { ITaskFE } from "types/ITaskFE";
import CheckBox from "components/table/CheckBox";
import CheckBox2 from "./CheckBox2";
import { FilterTask } from "types/FilterTask";

interface ITasksTable {
	tasks: ITaskFE[];
	fastFilter: FilterTask;
}

interface IChecks {
	[key: number]: boolean;
}

const maxItemsInPage = 11;

const TasksTable: React.FC<ITasksTable> = ({ tasks: tasksParam }) => {
	const [searchByName, setSearchByName] = useState<string>("");
	const [searchByNameOpen, setSearchByNameOpen] = useState<boolean>(false);
	const inputSearchRef = useRef<HTMLInputElement>(null);
	const imgIconSearchRef = useRef<HTMLImageElement>(null);
	const [pageNumber, setPageNumber] = useState<number>(0);

	const tasks = tasksParam.filter((e) =>
		searchByNameOpen ? e.name.toLowerCase().includes(searchByName.toLowerCase()) : true
	);

	const maxPageNumber = Math.ceil(tasks.length / maxItemsInPage);

	const [selectedItems, setSelectedItems] = useState<IChecks>(tasks.map((e) => false));

	const SetItem = (index: number, value: boolean) => {
		setSelectedItems((items) => ({ ...items, [index]: value }));
	};

	const isAllSelected = Object.values(selectedItems).every(Boolean);

	const SetAllItems = (value: boolean) => {
		setSelectedItems((items) => Object.keys(items).map((item) => value));
	};

	const SetCompleteTask = (name: string, value: boolean) => {
		// setSelectedItems((items) => Object.keys(items).map((item) => value));
		alert("todo");
	};

	// useEventListener("mousedown", (e) => {
	// 	if (
	// 		(inputSearchRef.current && !inputSearchRef.current.contains(e.target as any)) ||
	// 		(imgIconSearchRef.current && !imgIconSearchRef.current.contains(e.target as any))
	// 	)
	// 		setSearchByNameOpen(false);
	// });
	const setPage = (x: number) => {
		if (x >= 0 && x < maxPageNumber) {
			// alert("todo");
			setPageNumber(x);
		}
	};

	return (
		<div className="bg-[#171923] py-6 px-8 rounded-3xl m-1 h-full flex flex-col">
			<h3 className="mx-5 text-[#D1D0D1]">({tasks.length} tarefas)</h3>
			<div className="bg-[#22242E] mt-2 rounded-[20px] p-8 h-full">
				<table className="w-full">
					<thead>
						<tr className="border-b border-[#464750] text-left">
							<th className="px-4 py-2">
								<CheckBox value={isAllSelected} onChange={(v) => SetAllItems(!isAllSelected)} />
							</th>
							<th className="px-4 py-2">
								<span>Tarefa</span>

								<img
									ref={imgIconSearchRef}
									onClick={() => setSearchByNameOpen(!searchByNameOpen)}
									src="/images/Barra de Busca.svg"
									className={classNames(
										"relative inline w-4 h-4 ml-3"
										// searchByNameOpen && "opacity-0"
									)}
								/>
								<input
									ref={inputSearchRef}
									type="text"
									value={searchByName}
									onChange={(e) => setSearchByName(e.target.value)}
									className={classNames(
										"m-1 p-1 text-[14px] font-thin h-6 bg-[#22242E] focus:outline-none border border-[#718086] rounded-sm",
										!searchByNameOpen && "opacity-0"
									)}
									placeholder="Buscar..."
								/>
							</th>
							<th className="px-4 py-2 border-l border-r border-[#464750]  text-[#718086] font-medium">
								Responsáveis
							</th>
							<th className="px-4 py-2 text-[#718086] font-medium">Data de entrega</th>
						</tr>
					</thead>
					<tbody>
						{tasks
							.filter(
								(t, i) => i >= pageNumber * maxItemsInPage && i < (pageNumber + 1) * maxItemsInPage
							)
							.map((t, i) => (
								<tr key={i} className={classNames(i % 2 == 1 && "bg-[#1C1E27]")}>
									<td className="px-4 py-2">
										<CheckBox
											value={selectedItems[i]}
											onChange={(v) => SetItem(i, !selectedItems[i])}
										/>
									</td>
									<td className="px-4 py-2">
										<CheckBox2
											value={t.completed}
											onChange={(e) => SetCompleteTask(t.name, t.completed)}
										/>{" "}
										{t.name}
									</td>
									<td className="px-4 py-2">
										{t.responsible.map((r, i) => (
											<img
												key={i}
												src={r.photo}
												alt={r.name}
												className="inline-block w-6 h-6 rounded-full"
											/>
										))}
									</td>
									<td className="px-4 py-2">{moment(t.date).format("DD/MM/YYYY")}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			<div className="flex items-center gap-32 mx-auto mt-3">
				<button
					className={classNames(
						"bg-[#22242E] px-8 py-2 rounded-lg",
						pageNumber <= 0
							? "text-[#718086] hover:cursor-not-allowed"
							: "text-[#d1d0d1] hover:#2f353d"
					)}
					onClick={() => setPage(pageNumber - 1)}
				>
					Anterior
				</button>
				<div className="flex items-center gap-3 ">
					<span>Página</span>
					<input
						type="number"
						value={pageNumber + 1}
						onChange={(e) => setPageNumber(parseInt(e.target.value) - 1)}
						className="w-8 h-8 px-0 bg-[#22242E] text-center rounded-md"
					/>
					<span>de {maxPageNumber}</span>
				</div>
				<button
					className={classNames(
						"bg-[#22242E] px-8 py-2 rounded-lg",
						pageNumber >= maxPageNumber - 1
							? "text-[#718086] hover:cursor-not-allowed"
							: "text-[#d1d0d1] hover:#2f353d"
					)}
					onClick={() => setPage(pageNumber + 1)}
				>
					Proxíma
				</button>
			</div>
		</div>
	);
};

export default TasksTable;
