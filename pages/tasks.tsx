import moment from "moment";
import { useRef, useState } from "react";
import { ITask } from "types/ITask";
import { ITaskFE } from "types/ITaskFE";
import { classNames } from "lib/classNames";
import useEventListener from "react-use-event-listener";
import TasksTable from "components/table/TasksTable";
import { FilterTask } from "types/FilterTask";

const tasks: ITaskFE[] = [
	{
		completed: false,
		date: moment().add(1, "days").toDate(),
		description: "Tarefa com um teste, pronto para testar.",
		name: "Tarefa 1",
		responsible: [
			{
				_id: "adsasd",
				email: "adssadsda",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasddd",
				email: "ff",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasd",
				email: "ggg",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
		],
	},
	{
		completed: false,
		date: moment().add(2, "days").toDate(),
		description: "Tarefa com um teste, pronto para testar.",
		name: "Tarefa 1",
		responsible: [
			{
				_id: "adsasd",
				email: "adssadsda",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasddd",
				email: "ff",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasd",
				email: "ggg",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
		],
	},
	{
		completed: false,
		date: moment().add(3, "days").toDate(),
		description: "Tarefaadssda com um teste, pronto para testar.",
		name: "Tarefa 1adsdsa",
		responsible: [
			{
				_id: "dsa",
				email: "adssdsaadsda",
				name: "testdsadsae",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasddfd",
				email: "ffff",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "das",
				email: "ggg",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
		],
	},
	{
		completed: false,
		date: moment().add(2, "days").toDate(),
		description: "Tarefa com um teste, pronto para testar.",
		name: "Tarefa 1",
		responsible: [
			{
				_id: "adsasd",
				email: "adssadsda",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasddd",
				email: "ff",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasd",
				email: "ggg",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
		],
	},
	{
		completed: false,
		date: moment().add(2, "days").toDate(),
		description: "Tarefa com um teste, pronto para testar.",
		name: "Tarefa 1",
		responsible: [
			{
				_id: "adsasd",
				email: "adssadsda",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasddd",
				email: "ff",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasd",
				email: "ggg",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
		],
	},
	{
		completed: false,
		date: moment().add(2, "days").toDate(),
		description: "Tarefa com um teste, pronto para testar.",
		name: "Tarefa 1",
		responsible: [
			{
				_id: "adsasd",
				email: "adssadsda",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasddd",
				email: "ff",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasd",
				email: "ggg",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
		],
	},
	{
		completed: false,
		date: moment().add(2, "days").toDate(),
		description: "Tarefa com um teste, pronto para testar.",
		name: "Tarefa 1",
		responsible: [
			{
				_id: "adsasd",
				email: "adssadsda",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasddd",
				email: "ff",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasd",
				email: "ggg",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
		],
	},
	{
		completed: false,
		date: moment().add(2, "days").toDate(),
		description: "Tarefa com um teste, pronto para testar.",
		name: "Tarefa 1",
		responsible: [
			{
				_id: "adsasd",
				email: "adssadsda",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasddd",
				email: "ff",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasd",
				email: "ggg",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
		],
	},
	{
		completed: false,
		date: moment().add(2, "days").toDate(),
		description: "Tarefa com um teste, pronto para testar.",
		name: "Tarefa 1",
		responsible: [
			{
				_id: "adsasd",
				email: "adssadsda",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasddd",
				email: "ff",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasd",
				email: "ggg",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
		],
	},
	{
		completed: false,
		date: moment().add(2, "days").toDate(),
		description: "Tarefa com um teste, pronto para testar.",
		name: "Tarefa 1",
		responsible: [
			{
				_id: "adsasd",
				email: "adssadsda",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasddd",
				email: "ff",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasd",
				email: "ggg",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
		],
	},
	{
		completed: false,
		date: moment().add(2, "days").toDate(),
		description: "Tarefa com um teste, pronto para testar.",
		name: "Tarefa 1",
		responsible: [
			{
				_id: "adsasd",
				email: "adssadsda",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasddd",
				email: "ff",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasd",
				email: "ggg",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
		],
	},
	{
		completed: false,
		date: moment().add(2, "days").toDate(),
		description: "Tarefa com um teste, pronto para testar.",
		name: "Tarefa 1",
		responsible: [
			{
				_id: "adsasd",
				email: "adssadsda",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasddd",
				email: "ff",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasd",
				email: "ggg",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
		],
	},
	{
		completed: false,
		date: moment().add(2, "days").toDate(),
		description: "Tarefa com um teste, pronto para testar.",
		name: "Tarefa 1",
		responsible: [
			{
				_id: "adsasd",
				email: "adssadsda",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasddd",
				email: "ff",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasd",
				email: "ggg",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
		],
	},
	{
		completed: false,
		date: moment().add(2, "days").toDate(),
		description: "Tarefa com um teste, pronto para testar.",
		name: "Tarefa 1",
		responsible: [
			{
				_id: "adsasd",
				email: "adssadsda",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasddd",
				email: "ff",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasd",
				email: "ggg",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
		],
	},
	{
		completed: false,
		date: moment().add(2, "days").toDate(),
		description: "Tarefa com um teste, pronto para testar.",
		name: "Tarefa 1",
		responsible: [
			{
				_id: "adsasd",
				email: "adssadsda",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasddd",
				email: "ff",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasd",
				email: "ggg",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
		],
	},
	{
		completed: false,
		date: moment().add(2, "days").toDate(),
		description: "Tarefa com um teste, pronto para testar.",
		name: "Tarefa 1",
		responsible: [
			{
				_id: "adsasd",
				email: "adssadsda",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasddd",
				email: "ff",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasd",
				email: "ggg",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
		],
	},
	{
		completed: false,
		date: moment().add(2, "days").toDate(),
		description: "Tarefa com um teste, pronto para testar.",
		name: "Tarefa 1",
		responsible: [
			{
				_id: "adsasd",
				email: "adssadsda",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasddd",
				email: "ff",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasd",
				email: "ggg",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
		],
	},
	{
		completed: false,
		date: moment().add(2, "days").toDate(),
		description: "Tarefa com um teste, pronto para testar.",
		name: "Tarefa 1",
		responsible: [
			{
				_id: "adsasd",
				email: "adssadsda",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasddd",
				email: "ff",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasd",
				email: "ggg",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
		],
	},
	{
		completed: false,
		date: moment().add(2, "days").toDate(),
		description: "Tarefa com um teste, pronto para testar.",
		name: "Tarefa 1",
		responsible: [
			{
				_id: "adsasd",
				email: "adssadsda",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasddd",
				email: "ff",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
			{
				_id: "adsasd",
				email: "ggg",
				name: "teste",
				permission: "member",
				photo:
					"https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-pt.jpg",
			},
		],
	},
];

const Login: React.FC = () => {
	const [filter, setFilter] = useState<FilterTask>("responsible");

	const CreateNewTask = () => {
		alert("todo");
	};

	return (
		<div className="bg-[#22242E] flex flex-row min-h-screen">
			<aside className="flex flex-col h-screen px-2 pt-6 pb-4">
				<div className="rounded-md bg-[#171923] p-4 hover:cursor-pointer">
					<img src="/images/home.svg" className="scale-125" alt="Home" />
				</div>
				<a className="mt-auto" href="https://intranett.com.br" target="_blank">
					<img
						src="/images/Workmize Logotipo Fundo Escuro.svg"
						alt="Workmize Logotipo Fundo Escuro"
						className="mx-auto"
					/>
				</a>
			</aside>
			<main className="text-white border mt-2 rounded-tl-[50px] border-[#464750] w-full flex p-7 pb-2 flex-col">
				<div className="w-full">
					<div className="flex flex-row w-full">
						<div className="flex flex-row items-center gap-5">
							<img src="/images/Avatar.png" alt="people" className="rounded-full w-7 h-7" />
							<h1 className="text-2xl font-bold">Minhas tarefas</h1>
						</div>
						<img src="/images/Avatar.png" alt="people" className="ml-auto rounded-full w-14 h-14" />
					</div>
				</div>
				<div className="flex flex-row text-[14px] gap-2 items-center">
					<h3 className="text-[#f8f8f8]">FILTROS RÁPIDOS</h3>
					<button
						className={classNames(
							"px-8 py-2 text-[#C8C8C8] rounded-md",
							filter === "all" ? "bg-[#322659]" : "bg-[#2F353D] bg-opacity-40"
						)}
						onClick={() => setFilter("all")}
					>
						Todas
					</button>
					<button
						className={classNames(
							"px-8 py-2 text-[#C8C8C8] rounded-md",
							filter === "my" ? "bg-[#322659]" : "bg-[#2F353D] bg-opacity-40"
						)}
						onClick={() => setFilter("my")}
					>
						Criadas por mim
					</button>
					<button
						className={classNames(
							"px-8 py-2 text-[#C8C8C8] rounded-md",
							filter === "responsible" ? "bg-[#322659]" : "bg-[#2F353D] bg-opacity-40"
						)}
						onClick={() => setFilter("responsible")}
					>
						Sou Responsável
					</button>
				</div>
				<div className="my-6">
					<button
						onClick={CreateNewTask}
						className="text-white bg-[#805AD5] px-4 py-2 rounded-lg hover:bg-opacity-40 transition-all"
					>
						Nova tarefa
					</button>
				</div>
				<TasksTable tasks={tasks} fastFilter={filter} />
			</main>
		</div>
	);
};

export default Login;
