import { useState } from "react";
import ModalLogin from "components/ModalLogin";
import {
	ExclamationIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronDownIcon,
} from "@heroicons/react/solid";
import { Listbox, Transition } from "@headlessui/react";
import { Permission } from "types/Permission";
import { Select } from "@chakra-ui/select";

interface IFieldError {
	email?: string;
	password?: string;
}

const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [permission, setPermission] = useState<Permission>("member");
	const [fieldError, setFieldError] = useState<IFieldError>({
		email: "Esse campo não pode estar vazio.",
	});
	const [isModalOpen, setModalOpen] = useState(false);

	const Login = () => {
		alert("todo");
	};

	const OpenModalCreateUser = () => {
		setModalOpen(true);
	};

	return (
		<main className="grid h-screen grid-cols-2 text-white">
			<div className="bg-[#171923] flex justify-center">
				<div className="">
					<img
						src="/images/Workmize Logotipo Oficial Horizontal Em Cores Fundo Escuro.svg"
						alt="workmize"
						className="mx-40 my-16"
					/>
					<div className="my-8">
						<h1 className="text-2xl font-bold">Acesse a Workmize</h1>
						<p className="font-thin">Por favor insira seus dados para prosseguir.</p>
					</div>
					<div className="flex flex-col gap-5 min-w-[403px]">
						{(fieldError.email || fieldError.password) && (
							<div className="bg-[#F5565C] flex-row flex px-4 py-2 rounded-md font-thin">
								<ExclamationIcon className="w-5 -mb-1" />
								<span className="font-thin">E-mail ou senha inválidos, tente novamente.</span>
							</div>
						)}
						<label className="flex flex-col">
							<span>E-mail</span>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="nome@email.com"
								className="bg-[#0F1016] px-6 py-3 rounded-md"
							/>

							<span className="text-[#F5565C]">{fieldError?.email}</span>
						</label>
						<label className="flex flex-col">
							<span>Senha</span>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								placeholder="*************"
								className="bg-[#0F1016] px-6 py-3 rounded-md"
							/>
							<span className="text-[#F5565C]">{fieldError?.password}</span>
						</label>
						<label className="flex flex-col">
							<span>Permissão</span>
							<div className="flex flex-row flex-grow w-full">
								<select
									className="bg-[#0F1016] px-6 py-3 rounded-md appearance-none w-full"
									value={permission}
									onChange={(e) => setPermission(e.target.value as any)}
								>
									<option value="member">Membro</option>
									<option value="admin">Administrador</option>
								</select>
								<ChevronDownIcon className="z-20 float-right w-5 -mx-9" />
							</div>
						</label>
						<button
							onClick={Login}
							type="submit"
							className="bg-[#48BB78] px-6 py-4 rounded-md font-bold hover:bg-[#68D391]"
						>
							Fazer Login
						</button>
						<div className="text-center">
							<span>Ainda não é usuário? </span>
							<button onClick={OpenModalCreateUser} className="text-[#B794F4]">
								Crie seu usuário!
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-[#805AD5] items-center flex justify-center flex-col">
				{/* <div>
					<span>Dia</span>
					<button></button>
					<span>Noite</span>
				</div> */}
				<div className="flex flex-row gap-32">
					<ChevronLeftIcon className="w-12 opacity-30 hover:cursor-not-allowed" />
					<img src="/images/Work time-amico.svg" alt="WORK.png" />
					<ChevronRightIcon className="w-12 hover:cursor-pointer opacity-70 hover:opacity-100" />
				</div>
				<h1 className="mt-8 text-2xl font-bold">Gerencie as tarefas da sua</h1>
				<div className="flex flex-row gap-3 mt-10">
					<svg height="12" width="12">
						<circle cx="6" cy="6" r="6" fill="#48BB78" />
					</svg>
					<svg height="12" width="12">
						<circle cx="6" cy="6" r="6" fill="#D1D0D1" />
					</svg>
					<svg height="12" width="12">
						<circle cx="6" cy="6" r="6" fill="#D1D0D1" />
					</svg>
					<svg height="12" width="12">
						<circle cx="6" cy="6" r="6" fill="#D1D0D1" />
					</svg>
					<svg height="12" width="12">
						<circle cx="6" cy="6" r="6" fill="#D1D0D1" />
					</svg>
				</div>
			</div>
			<ModalLogin isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
		</main>
	);
};

export default Login;
