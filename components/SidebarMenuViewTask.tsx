import { Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/outline";
interface IProps {
    open: boolean;
    taskId: string;
    onClose: () => void;
}

const SidebarMenuViewTask: React.FC<IProps> = ({ open, onClose, taskId }) => {
    return (
        <Transition
            className="fixed inset-0 z-10 overflow-y-auto"
            show={open}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <aside className="flex h-screen">
                <div className="w-full bg-[#000] bg-opacity-30"></div>

                <div className="float-right bg-[#171923] relative flex-col">
                    <div
                        className="rounded-full bg-[#464750] p-4 absolute -left-7 top-0 hover:cursor-pointer"
                        onClick={onClose}
                    >
                        <ChevronRightIcon className="w-5" />
                    </div>
                    <div className="bg-[#31274F] px-8 py-3 mr-5 w-full">
                        <h1
                            className="mr-5 text-2xl"
                            style={{ whiteSpace: "nowrap" }}
                        >
                            Visualizar tarefa
                        </h1>
                    </div>
                </div>
            </aside>
        </Transition>
    );
};

export default SidebarMenuViewTask;
