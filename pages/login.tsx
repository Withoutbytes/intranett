import { useState } from "react";
import {
    ExclamationIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/solid";
import ModalRegister from "components/ModalRegister";
import client from "lib/apolloClient";
import { Role, useGetMeQuery, useLoginMutation } from "lib/apolloDefinitions";

import { useRouter } from "next/router";

interface IFieldError {
    email?: string;
    password?: string;
}

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [permission, setPermission] = useState<Role>(Role.Member);
    const [fieldError, setFieldError] = useState<IFieldError>({});
    const [isModalOpen, setModalOpen] = useState(false);

    const [login] = useLoginMutation({ client });
    const { data: meUser } = useGetMeQuery({ client });

    const router = useRouter();

    if (meUser) {
        router.push("/tasks");
    }

    const Login = async () => {
        if (email.length === 0) {
            setFieldError({
                ...fieldError,
                email: "Esse campo não pode estar vazio.",
            });
            return;
        }
        if (password.length === 0) {
            setFieldError({
                ...fieldError,
                password: "Esse campo não pode estar vazio.",
            });
            return;
        }
        setFieldError({});

        login({ variables: { email, password, role: permission } })
            .then(({ data }) => {
                localStorage.setItem("token", data.login.token);

                setFieldError({});
                router.push("/tasks");
            })
            .catch((e) => {
                console.error({ e });
                setFieldError({
                    email: "E-mail ou senha incorretos.",
                    password: "E-mail ou senha incorretos.",
                });
            });
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
                        <h1 className="text-2xl font-bold">
                            Acesse a Workmize
                        </h1>
                        <p className="font-thin">
                            Por favor insira seus dados para prosseguir.
                        </p>
                    </div>
                    <div className="flex flex-col gap-5 min-w-[403px]">
                        {(fieldError.email || fieldError.password) && (
                            <div className="bg-[#F5565C] flex-row flex px-4 py-2 rounded-md font-thin">
                                <ExclamationIcon className="w-5 -mb-1" />
                                <span className="font-thin">
                                    E-mail ou senha inválidos, tente novamente.
                                </span>
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
                                style={{ border: "transparent" }}
                            />

                            <span className="text-[#F5565C]">
                                {fieldError?.email}
                            </span>
                        </label>
                        <label className="flex flex-col">
                            <span>Senha</span>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="*************"
                                className="bg-[#0F1016] px-6 py-3 rounded-md"
                                style={{ border: "transparent" }}
                            />
                            <span className="text-[#F5565C]">
                                {fieldError?.password}
                            </span>
                        </label>
                        <label className="flex flex-col">
                            <span>Permissão</span>
                            <div className="flex flex-row flex-grow w-full">
                                <select
                                    className="bg-[#0F1016] px-6 py-3 rounded-md appearance-none w-full"
                                    style={{ border: "transparent" }}
                                    value={permission}
                                    onChange={(e) =>
                                        setPermission(e.target.value as any)
                                    }
                                >
                                    <option value={Role.Member}>Membro</option>
                                    <option value={Role.Admin}>
                                        Administrador
                                    </option>
                                </select>
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
                            <button
                                onClick={OpenModalCreateUser}
                                className="text-[#B794F4]"
                            >
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
                <h1 className="mt-8 text-2xl font-bold">
                    Gerencie as tarefas da sua
                </h1>
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
            <ModalRegister
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
            />
        </main>
    );
};

export default Login;
