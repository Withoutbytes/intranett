import moment from "moment";
import { useRef, useState } from "react";
import { classNames } from "lib/classNames";
import useEventListener from "react-use-event-listener";
import TasksTable from "components/table/TasksTable";
import { FilterTask } from "types/FilterTask";
import ModalNewTask from "components/ModalNewTask";
import SidebarMenuViewTask from "components/SidebarMenuViewTask";
import { Popover } from "@headlessui/react";

import client from "lib/apolloClient";
import { useGetMeQuery, useCreateTaskMutation } from "lib/apolloDefinitions";

import { useRouter } from "next/router";
import PopoverLogout from "components/PopoverLogout";

const Tasks: React.FC = () => {
    const [filter, setFilter] = useState<FilterTask>("responsible");
    const [isModalOpenNewTsaks, setModalOpenNewTsaks] = useState(false);
    const [sidebarMenuOpen, setSidebarMenuOpen] = useState(false);
    const [sidebarMenuTaskId, setSidebarMenuTaskId] = useState<string>(null);

    const {
        data: getMeData,
        error: meUserError,
        loading: loadingMe,
    } = useGetMeQuery({
        client,
    });

    const router = useRouter();

    if (loadingMe) return <p>Carregando...</p>;
    if (meUserError) {
        router.push("/login");
        return <p>Redirecionando para o login</p>;
    }

    const CreateNewTask = () => {
        setModalOpenNewTsaks(true);
    };

    const onClickViewTask = (id: string) => {
        setSidebarMenuOpen(true);
    };

    return (
        <div className="bg-[#22242E] flex flex-row min-h-screen">
            <aside className="flex flex-col h-screen px-2 pt-6 pb-4">
                <div className="rounded-md bg-[#171923] p-4 hover:cursor-pointer">
                    <img
                        src="/images/home.svg"
                        className="scale-125"
                        alt="Home"
                    />
                </div>
                <a
                    className="mt-auto"
                    href="https://intranett.com.br"
                    target="_blank"
                >
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
                            <img
                                src={
                                    getMeData.getMe.image ||
                                    "/images/Avatar.png"
                                }
                                alt="people"
                                className="rounded-full w-7 h-7"
                            />
                            <h1 className="text-2xl font-bold">
                                Minhas tarefas
                            </h1>
                        </div>
                        <div className="ml-auto">
                            <PopoverLogout>
                                <img
                                    src={"/images/Avatar.png"}
                                    alt="people"
                                    className="rounded-full w-14 h-14"
                                />
                            </PopoverLogout>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row text-[14px] gap-2 items-center">
                    <h3 className="text-[#f8f8f8]">FILTROS RÁPIDOS</h3>
                    <button
                        className={classNames(
                            "px-8 py-2 text-[#C8C8C8] rounded-md",
                            filter === "all"
                                ? "bg-[#322659]"
                                : "bg-[#2F353D] bg-opacity-40"
                        )}
                        onClick={() => setFilter("all")}
                    >
                        Todas
                    </button>
                    <button
                        className={classNames(
                            "px-8 py-2 text-[#C8C8C8] rounded-md",
                            filter === "my"
                                ? "bg-[#322659]"
                                : "bg-[#2F353D] bg-opacity-40"
                        )}
                        onClick={() => setFilter("my")}
                    >
                        Criadas por mim
                    </button>
                    <button
                        className={classNames(
                            "px-8 py-2 text-[#C8C8C8] rounded-md",
                            filter === "responsible"
                                ? "bg-[#322659]"
                                : "bg-[#2F353D] bg-opacity-40"
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
                <div className="h-full overflow-y-scroll">
                    <TasksTable
                        onClickTask={onClickViewTask}
                        fastFilter={filter}
                    />
                </div>
            </main>
            <ModalNewTask
                isOpen={isModalOpenNewTsaks}
                onClose={() => setModalOpenNewTsaks(false)}
            />
            <SidebarMenuViewTask
                open={sidebarMenuOpen}
                taskId={sidebarMenuTaskId}
                onClose={() => setSidebarMenuOpen(false)}
            />
        </div>
    );
};

export default Tasks;
