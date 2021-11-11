import { useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { Transition } from "@tailwindui/react";
import SelectMenuMembers from "./SelectMenuMembers";
import moment from "moment";
import Calendar from "./CustomCalendar";
interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalNewTask: React.FC<IProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [endDate, setEndDate] = useState(new Date());
    const [responsiblesIds, setResponsiblesIds] = useState<string[]>([]);

    const createUser = () => {
        alert("todo");
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
                <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center items- sm:block sm:p-0">
                    <div
                        className={
                            "inline-block align-bottom rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-[421px]"
                        }
                    >
                        <div className="bg-[#31274F] rounded-t-3xl flex flex-row px-8 pb-2 pt-4 text-lg font-bold">
                            <div className="flex flex-row w-full gap-3">
                                <CheckCircleIcon className="w-5 -mt-2" />
                                <span>Nova tarefa</span>
                            </div>
                            <XIcon
                                className="w-10 hover:cursor-pointer"
                                onClick={onClose}
                            />
                        </div>
                        <div className="bg-[#22242E] p-5 text-center">
                            <div className="bg-[#171923] p-5 rounded-lg flex flex-col gap-5">
                                <label className="flex flex-col gap-1">
                                    <div className="flex flex-row w-full gap-3">
                                        <img
                                            src="/images/menu-icon-new-task.svg"
                                            className="w-5 -mt-1"
                                        />
                                        <span className="text-base">Nome</span>{" "}
                                    </div>
                                    <input
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        type="text"
                                        className="bg-[#0F1016] text-[#718086] px-5 py-2 rounded-lg"
                                        style={{ border: "transparent" }}
                                        placeholder="Nome da tarefa"
                                    />
                                </label>
                                <label className="flex flex-col gap-1">
                                    <div className="flex flex-row w-full gap-3">
                                        <img
                                            src="/images/user.svg"
                                            className="w-5 -mt-1"
                                        />
                                        <span className="text-base">
                                            Responsáveis
                                        </span>{" "}
                                    </div>

                                    <SelectMenuMembers />
                                </label>
                                <label className="flex flex-col gap-1">
                                    <div className="flex flex-row w-full gap-3">
                                        <img
                                            src="/images/calendar-icon-new-task.svg"
                                            className="w-5 -mt-1"
                                        />
                                        <span className="text-base">
                                            Entrega
                                        </span>{" "}
                                    </div>
                                    {/* <input
                                        value={moment(endDate).format(
                                            "DD/MM/YYYY"
                                        )}
                                        onChange={(e) =>
                                            setEndDate(
                                                moment(
                                                    e.target.value,
                                                    "DD/MM/YYYY"
                                                ).toDate()
                                            )
                                        }
                                        type="text"
                                        className="bg-[#0F1016] text-[#718086] px-5 py-2 rounded-lg"
                                        style={{ border: "transparent" }}
                                        placeholder="DD/MM/YYYY"
                                    /> */}
                                    <Calendar
                                        date={endDate}
                                        onChange={setEndDate}
                                    />
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

export default ModalNewTask;
