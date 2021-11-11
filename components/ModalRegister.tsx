import { XIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useState } from "react";
import { Transition } from "@tailwindui/react";
import client from "lib/apolloClient";
import {
    Role,
    useRegisterMutation,
    useLoginMutation,
} from "lib/apolloDefinitions";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalRegister: React.FC<IProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [permission, setPermission] = useState<Role>(Role.Member);

    const [register] = useRegisterMutation({ client });
    const [login] = useLoginMutation({ client });

    const router = useRouter();

    const createUser = () => {
        if (!name || !email || !password) {
            return;
        }

        register({ variables: { name, email, password, role: permission } })
            .then(() => {
                login({ variables: { email, password, role: permission } })
                    .then(({ data }) => {
                        localStorage.setItem("token", data.login.token);
                        router.push("/tasks");
                    })
                    .catch((e) => {
                        console.error({ e });
                        alert("Error on login.");
                    });
            })
            .catch((e) => {
                alert("Error on creating user:" + e.message + ".");
            });
    };

    return (
        <Transition
            className="fixed inset-0 z-10 overflow-y-auto"
            show={isOpen}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div
                className="fixed inset-0 bg-[#000] bg-opacity-30 transition-all"
                aria-hidden="true"
            >
                <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <div
                        className={
                            "inline-block align-bottom rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-[421px]"
                        }
                    >
                        <div className="bg-[#31274F] rounded-t-3xl flex flex-row px-8 pb-2 pt-4 text-lg font-bold">
                            <div className="flex flex-row w-full gap-3">
                                <img
                                    src="/images/user.svg"
                                    alt="User"
                                    className="w-5 -mt-2"
                                />
                                <span>Criar usuário</span>
                            </div>
                            <XIcon
                                className="w-10 hover:cursor-pointer"
                                onClick={onClose}
                            />
                        </div>
                        <div className="bg-[#22242E] p-5 text-center">
                            <div className="bg-[#171923] p-5 rounded-lg flex flex-col gap-5">
                                <div className="text-left">
                                    <h1>Dados do seu usuário</h1>
                                </div>
                                <img
                                    src="/images/Avatar.png"
                                    alt="User photo"
                                    className="rounded-full w-[110px] mx-auto"
                                />
                                <label className="flex flex-col gap-1">
                                    <div className="flex justify-between">
                                        <span className="text-base">Nome</span>
                                        <span className="text-[#F5565C] text-sm">
                                            <span className="text-bold">*</span>{" "}
                                            OBRIGATÓRIO
                                        </span>
                                    </div>
                                    <input
                                        value={name}
                                        style={{ border: "transparent" }}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        type="text"
                                        className="bg-[#0F1016] text-[#718086] px-5 py-2 rounded-lg"
                                        placeholder="Digite seu nome..."
                                    />
                                </label>
                                <label className="flex flex-col gap-1">
                                    <div className="flex justify-between">
                                        <span className="text-base">
                                            E-mail
                                        </span>
                                        <span className="text-[#F5565C] text-sm">
                                            <span className="text-bold">*</span>{" "}
                                            OBRIGATÓRIO
                                        </span>
                                    </div>
                                    <input
                                        value={email}
                                        style={{ border: "transparent" }}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        type="email"
                                        className="bg-[#0F1016] text-[#718086] px-5 py-2 rounded-lg"
                                        placeholder="Digite o seu email..."
                                    />
                                </label>
                                <label className="flex flex-col gap-1">
                                    <div className="flex justify-between">
                                        <span className="text-base">Senha</span>
                                        <span className="text-[#F5565C] text-sm">
                                            <span className="text-bold">*</span>{" "}
                                            OBRIGATÓRIO
                                        </span>
                                    </div>
                                    <input
                                        value={password}
                                        style={{ border: "transparent" }}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        type="password"
                                        className="bg-[#0F1016] text-[#718086] px-5 py-2 rounded-lg"
                                        placeholder="Digite sua senha..."
                                    />
                                </label>
                                <label className="flex flex-col gap-1">
                                    <div className="flex justify-between">
                                        <span className="text-base">
                                            Permissão
                                        </span>
                                        <span className="text-[#F5565C] text-sm">
                                            <span className="text-bold">*</span>{" "}
                                            OBRIGATÓRIO
                                        </span>
                                    </div>
                                    <select
                                        className="bg-[#0F1016] px-6 py-3 rounded-md"
                                        style={{ border: "transparent" }}
                                        value={permission}
                                        onChange={(e) =>
                                            setPermission(e.target.value as any)
                                        }
                                    >
                                        <option value={Role.Member}>
                                            Membro
                                        </option>
                                        <option value={Role.Admin}>
                                            Administrador
                                        </option>
                                    </select>
                                </label>
                            </div>
                            <button
                                onClick={createUser}
                                className="bg-[#805AD5] px-8 py-2 font-bold rounded-xl mt-5"
                            >
                                Criar usuário
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );
};

export default ModalRegister;
